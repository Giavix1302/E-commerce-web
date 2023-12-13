import { getElement } from "./utils.js";

const openSideBar = getElement('.sidebar-toggle');
const closeSideBar = getElement('.sidebar__close');
const sidebar = getElement('.sidebar');
const sidebarContainer = getElement('.sidebar-container');

openSideBar.addEventListener('click', () => {
    sidebar.classList.add('open-sidebar');
})

closeSideBar.addEventListener('click', () => {
    sidebar.classList.remove('open-sidebar');
})

sidebar.addEventListener('click', () => {sidebar.classList.remove('open-sidebar')})
sidebarContainer.addEventListener('click', (e) => {e.stopPropagation()})
