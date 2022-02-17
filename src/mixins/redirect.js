import cookie from "vue-cookies";

export default {
    created: function () {
        const sessionCookie = cookie.get("connect.sid");
        const currentPath = this.$router.currentRoute.fullPath

        if (!sessionCookie && !_isRegisterPage(currentPath)) this.$router.push('/login')
        if (sessionCookie && (_isRegisterPage(currentPath) || _isLoginPage(currentPath))) this.$router.push('/upload')
    }
}

function _isRegisterPage(path) {
    return path === '/register'
}

function _isLoginPage(path) {
    return path === '/login'
} 