// import './src/css/normalize.css'
import '@fontsource/roboto'
import '@fontsource/roboto-slab'
import '@fontsource/open-sans'
import '@fontsource/material-icons'
import '@fontsource/nunito'
import '@fontsource/montserrat'
import './src/css/style.scss'
import './src/css/print.scss'
// Highlighting for code blocks
// import 'prismjs/themes/prism.css'

export const onRouteUpdate = ({ location, prevLocation }) => {
  if (location && location.state)
    location.state.referrer = prevLocation ? prevLocation.pathname : null
}
