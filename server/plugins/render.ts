export default defineNitroPlugin((nitroApp) => {
    nitroApp.hooks.hook('render:html', (html, { event }) => {
        console.log('render:html', html)
        html.bodyAppend.push('<div id="modal"></div>')
    })
})