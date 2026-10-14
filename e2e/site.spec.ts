import { expect, test, type Page } from '@playwright/test'

const pages = [
  { path: '/', heading: 'This is the home page' },
  { path: '/blog/', heading: 'Blog home' },
  {
    path: '/blog/fourth-post-has-bears/',
    heading: 'Fourth post has bears',
  },
  { path: '/cv/', heading: 'PA Ulander' },
  { path: '/missing-playwright-test-page/', heading: '404' },
]

async function monitorPage(page: Page) {
  const pageErrors: string[] = []
  const failedLocalResources: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('response', (response) => {
    const request = response.request()
    if (
      request.resourceType() !== 'document' &&
      response.status() >= 400 &&
      new URL(response.url()).origin === 'http://127.0.0.1:4321'
    ) {
      failedLocalResources.push(`${response.status()} ${response.url()}`)
    }
  })
  return { pageErrors, failedLocalResources }
}

async function expectLocalLinksAndImages(page: Page) {
  const urls = await page.locator('a[href], img[src]').evaluateAll((elements) =>
    elements
      .map((element) =>
        element instanceof HTMLAnchorElement
          ? element.href
          : (element as HTMLImageElement).src,
      )
      .filter((url) => new URL(url).origin === window.location.origin),
  )

  for (const url of [...new Set(urls)]) {
    const response = await page.request.get(url)
    expect(response.status(), `Local URL should load: ${url}`).toBeLessThan(400)
  }

  const images = await page.locator('img[src]').evaluateAll((elements) =>
    elements.map((element) => ({
      source: (element as HTMLImageElement).src,
      loaded:
        (element as HTMLImageElement).complete &&
        (element as HTMLImageElement).naturalWidth > 0,
    })),
  )
  for (const image of images) {
    expect(image.loaded, `Image should render: ${image.source}`).toBe(true)
  }
}

for (const { path, heading } of pages) {
  test(`${path} renders expected content without page errors or broken local resources`, async ({ page }) => {
    const errors = await monitorPage(page)
    await page.goto(path)
    await expect(page.getByRole('heading', { name: heading })).toBeVisible()

    if (path === '/blog/') {
      await expect(page.getByRole('heading', { name: 'Fourth post has bears' })).toBeVisible()
      await expect(page.getByRole('heading', { name: 'Third post has birds' })).toBeVisible()
    } else if (path === '/blog/fourth-post-has-bears/') {
      await expect(page.getByText('Fourth post featured text')).toBeVisible()
    } else if (path === '/cv/') {
      await expect(page.getByRole('heading', { name: 'Erfarenheter' })).toBeVisible()
    } else if (path.startsWith('/missing-')) {
      await expect(page.getByText('PAGE NOT FOUND')).toBeVisible()
    }

    await expectLocalLinksAndImages(page)
    expect(errors.pageErrors).toEqual([])
    expect(errors.failedLocalResources).toEqual([])
  })
}

test('blog cards and adjacent-post links navigate to the correct posts', async ({ page }) => {
  await page.goto('/blog/')
  await page.locator('a.card-link[href="/blog/fourth-post-has-bears/"]').click()
  await expect(page).toHaveURL(/\/blog\/fourth-post-has-bears\/$/)
  await expect(page.getByRole('heading', { name: 'Fourth post has bears' })).toBeVisible()

  await page
    .getByRole('navigation', { name: 'Adjacent posts' })
    .getByRole('link', { name: 'Third post has birds' })
    .click()
  await expect(page).toHaveURL(/\/blog\/third-post-has-birds\/$/)
  await expect(page.getByRole('heading', { name: 'Third post has birds' })).toBeVisible()

  const adjacentPosts = page.getByRole('navigation', { name: 'Adjacent posts' })
  await expect(adjacentPosts.getByRole('link', { name: 'Second post has cats' })).toHaveAttribute(
    'href',
    '/blog/second-post-has-cats/',
  )
  await expect(adjacentPosts.getByRole('link', { name: 'Fourth post has bears' })).toHaveAttribute(
    'href',
    '/blog/fourth-post-has-bears/',
  )
  await adjacentPosts.getByRole('link', { name: 'Fourth post has bears' }).click()
  await expect(page).toHaveURL(/\/blog\/fourth-post-has-bears\/$/)
  await expect(page.getByRole('heading', { name: 'Fourth post has bears' })).toBeVisible()
})

test('theme preference survives client-side navigation', async ({ page }) => {
  await page.goto('/')
  await page.locator('label[for="theme-toggle"]').click()
  const toggle = page.locator('#theme-toggle')
  await expect(toggle).toBeChecked()
  await expect(page.locator('html')).toHaveClass(/dark-mode/)

  await page.getByRole('link', { name: 'BLOG' }).click()
  await expect(page).toHaveURL(/\/blog\/$/)
  await expect(page.locator('html')).toHaveClass(/dark-mode/)
  await expect(page.locator('#theme-toggle')).toBeChecked()
  await expect(page.getByRole('link', { name: 'CV' })).toBeVisible()
})

test('print control calls the browser print function', async ({ page }) => {
  await page.goto('/cv/')
  await page.evaluate(() => {
    window.print = () => {
      document.documentElement.dataset.printCalled = 'true'
    }
  })

  await page.locator('#print-page').click()
  await expect(page.locator('html')).toHaveAttribute('data-print-called', 'true')
})