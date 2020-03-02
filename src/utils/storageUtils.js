/**
 * 操作local的工具函数
 */

export default {
    saveUser(user) {
        localStorage.setItem('user_key', JSON.stringify(user))
    },
    getUser() {
        return JSON.parse(localStorage.getItem('user_key') || '{ }')
    },
    removeUser() {
        console.log('remove')
        localStorage.removeItem('user_key')
    }
} 