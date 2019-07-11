export default {
    methods: {
        download(url, name = '', target) {
            if (url) {
                const a = document.createElement('A')
                a.setAttribute('href', url)
                a.style.display = 'none'
                a.setAttribute('download', name)
                a.setAttribute('target', target)
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
            }
        }
    }
}
