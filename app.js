// Event handling for tab functionality
const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        contents.forEach(content => {
            content.classList.add('hidden');
        });
        document.querySelector(`.${target}`).classList.remove('hidden');
    });
});
