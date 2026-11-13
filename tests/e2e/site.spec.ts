import { expect, test, type Page } from '@playwright/test'

const pages = [
  { path: '/', heading: 'Web and system development, from first sketch to production.' },
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
      .filter(
        (element) =>
          !(element instanceof HTMLAnchorElement && element.getAttribute('href')?.startsWith('#')),
      )
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
  await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'CV' })).toBeVisible()
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

test('CV print button still works after client-side navigation', async ({ page }) => {
  await page.goto('/')
  for (const name of ['CV', 'BLOG', 'CV']) {
    await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name, exact: true }).click()
  }
  await expect(page).toHaveURL(/\/cv\/$/)
  await page.evaluate(() => {
    window.print = () => {
      document.documentElement.dataset.printCalled = 'true'
    }
  })
  await page.locator('[data-print]').click()
  await expect(page.locator('html')).toHaveAttribute('data-print-called', 'true')
})

const readingPaths = [
  '/',
  '/blog/',
  '/blog/first-post-has-dogs/',
  '/blog/second-post-has-cats/',
  '/blog/third-post-has-birds/',
  '/blog/fourth-post-has-bears/',
]

for (const { width, columns } of [
  { width: 320, columns: 1 },
  { width: 600, columns: 1 },
  { width: 768, columns: 2 },
  { width: 1024, columns: 3 },
  { width: 1440, columns: 3 },
]) {
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`reading layouts are responsive at ${width}px in ${colorScheme} mode`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 })
      await page.emulateMedia({ colorScheme })

      for (const path of readingPaths) {
        await page.goto(path)
        await expect(page.locator('main h1')).toHaveCount(1)

        const layout = await page.evaluate(() => {
          const main = document.querySelector('main')!.getBoundingClientRect()
          const navigation = document.querySelector('.nav')!.getBoundingClientRect()
          const controls = [
            ...document.querySelectorAll('.nav a, .dark-button label'),
          ].map((element) => element.getBoundingClientRect().toJSON())
          const grid = document.querySelector('.cards')
          return {
            viewport: document.documentElement.clientWidth,
            scrollWidth: document.documentElement.scrollWidth,
            main: main.toJSON(),
            navigation: navigation.toJSON(),
            controls,
            columns: grid
              ? getComputedStyle(grid).gridTemplateColumns.split(' ').length
              : null,
          }
        })

        expect(layout.scrollWidth, `${path} should not scroll sideways`).toBeLessThanOrEqual(
          layout.viewport,
        )
        expect(layout.main.left, `${path} should have a left gutter`).toBeGreaterThanOrEqual(16)
        expect(layout.main.right).toBeLessThanOrEqual(layout.viewport - 16)
        expect(layout.main.top).toBeGreaterThan(layout.navigation.bottom)
        for (const control of layout.controls) {
          expect(control.left).toBeGreaterThanOrEqual(0)
          expect(control.right).toBeLessThanOrEqual(layout.viewport)
          expect(control.height).toBeGreaterThanOrEqual(44)
        }
        if (layout.columns !== null) expect(layout.columns).toBe(columns)
      }
    })
  }
}

test('adjacent-post navigation aligns with the article column', async ({ page }) => {
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/blog/second-post-has-cats/')
    const edges = await page.evaluate(() => {
      const article = document.querySelector('article.post-body')!.getBoundingClientRect()
      const navigation = document.querySelector('.post-navigation')!.getBoundingClientRect()
      return { article: article.toJSON(), navigation: navigation.toJSON() }
    })
    expect(Math.abs(edges.navigation.left - edges.article.left)).toBeLessThanOrEqual(1)
    expect(Math.abs(edges.navigation.right - edges.article.right)).toBeLessThanOrEqual(1)
  }
})

test('skip link and theme switch work with the keyboard', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main')).toBeFocused()

  await page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link', { name: 'CV', exact: true }).focus()
  await page.keyboard.press('Tab')
  const toggle = page.getByRole('checkbox', { name: 'Toggle dark mode' })
  await expect(toggle).toBeFocused()
  await page.keyboard.press('Space')
  await expect(toggle).toBeChecked()
  await expect(page.locator('html')).toHaveClass(/dark-mode/)

  await page.getByRole('link', { name: 'BLOG', exact: true }).click()
  await expect(page).toHaveURL(/\/blog\/$/)
  await expect(page.getByRole('checkbox', { name: 'Toggle dark mode' })).toBeChecked()
})

test('long reading content stays inside the mobile layout', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  await page.goto('/blog/first-post-has-dogs/')
  await page.locator('.post-heading').evaluate((heading) => {
    heading.textContent = 'LongTitle'.repeat(30)
  })
  await page.locator('article.post-body').evaluate((article) => {
    const paragraph = document.createElement('p')
    paragraph.textContent = 'LongUnbrokenWord'.repeat(50)
    const code = document.createElement('pre')
    code.textContent = 'const longLine = '.repeat(50)
    const table = document.createElement('table')
    const row = table.insertRow()
    for (let index = 0; index < 12; index++) {
      row.insertCell().textContent = `Column ${index}`
    }
    article.append(paragraph, code, table)
  })

  const dimensions = await page.locator('article.post-body').evaluate((article) => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    article: article.clientWidth,
    articleContent: article.scrollWidth,
    code: article.querySelector('pre')!.clientWidth,
    codeContent: article.querySelector('pre')!.scrollWidth,
    table: article.querySelector('table')!.clientWidth,
    tableContent: article.querySelector('table')!.scrollWidth,
  }))
  expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport)
  expect(dimensions.articleContent).toBeLessThanOrEqual(dimensions.article)
  expect(dimensions.codeContent).toBeGreaterThan(dimensions.code)
  expect(dimensions.tableContent).toBeGreaterThan(dimensions.table)
})

test('reading layouts reflow with text enlarged to 200%', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 })
  for (const path of ['/', '/blog/', '/blog/third-post-has-birds/']) {
    await page.goto(path)
    await page.addStyleTag({ content: 'html { font-size: 200%; }' })
    const layout = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      width: document.documentElement.scrollWidth,
      controls: [...document.querySelectorAll('.nav a, .dark-button label')].map(
        (element) => element.getBoundingClientRect().toJSON(),
      ),
    }))
    expect(layout.width).toBeLessThanOrEqual(layout.viewport)
    for (const control of layout.controls) {
      expect(control.left).toBeGreaterThanOrEqual(0)
      expect(control.right).toBeLessThanOrEqual(layout.viewport)
    }
  }
})

test('theme motion respects the reduced-motion preference', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  const duration = await page.locator('.theme-toggle-track').evaluate(
    (track) => parseFloat(getComputedStyle(track, '::before').transitionDuration),
  )
  expect(duration).toBeLessThanOrEqual(0.001)
})