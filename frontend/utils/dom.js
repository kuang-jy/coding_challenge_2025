// DOM 工具函数
class DOMUtils {
    // 创建元素
    static createElement(tag, className = '', textContent = '') {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (textContent) element.textContent = textContent;
        return element;
    }

    // 查找元素
    static $(selector, parent = document) {
        return parent.querySelector(selector);
    }

    // 查找所有元素
    static $$(selector, parent = document) {
        return Array.from(parent.querySelectorAll(selector));
    }

    // 添加事件监听器
    static on(element, event, handler) {
        element.addEventListener(event, handler);
    }

    // 移除事件监听器
    static off(element, event, handler) {
        element.removeEventListener(event, handler);
    }

    // 显示/隐藏元素
    static show(element) {
        element.style.display = '';
    }

    static hide(element) {
        element.style.display = 'none';
    }

    // 切换类名
    static toggleClass(element, className) {
        element.classList.toggle(className);
    }
}

window.DOMUtils = DOMUtils;