export default {
    // 函数节流
    // setTimeout方式
    throttle: function (fn, delay) {
        let timer = null;
        return function () {
            const context = this, args = arguments;
            if (timer !== null) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        }
    }
}