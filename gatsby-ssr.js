// import React from 'react'

// const MagicScriptTag = () => {
//   let codeToRunOnClient = `(function (e, a, o) {
//     function d(e) {
//       document.body.classList.add(e ? 'dark-mode' : 'light-mode'),
//         document.body.classList.remove(e ? 'light-mode' : 'dark-mode')
//     }
//     var t = window.matchMedia('(prefers-color-scheme: dark)'),
//       r = '(prefers-color-scheme: dark)' === t.media,
//       s = null
//     try {
//       s = localStorage.getItem('darkMode')
//     } catch (e) {}
//     var c = null !== s
//     if ((c && (s = JSON.parse(s)), c)) d(s)
//     else if (r) d(t.matches), localStorage.setItem('darkMode', t.matches)
//     else {
//       var l = document.body.classList.contains('dark-mode')
//       localStorage.setItem('darkMode', JSON.stringify(l))
//     }
//   })()`

//   // eslint-disable-next-line react/no-danger
//   return <script dangerouslySetInnerHTML={{ __html: codeToRunOnClient }} />
// }
// export const onRenderBody = ({ setPreBodyComponents }) => {
//   setPreBodyComponents(<MagicScriptTag />)
// }
