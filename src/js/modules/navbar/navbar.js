import { api } from "../shared/api.js";

export async function renderModules() {
    const navMenu = document.querySelector('.nav-menu');
    const result = await api.call("get_modules_by_role", {"role": sessionStorage.getItem("role")});

    if(result.success){
        let modules = result.data;
        let counter = 0;
        modules.forEach(element => {
            if (counter === 0) {
                navMenu.innerHTML += `
                    <a href="#" data-id="${element}" class="nav-item active">
                        <img src="/assets/${element.toLowerCase()}.svg" alt="${element} Icon" class="nav-icon">
                        <span>${element}</span>
                    </a>
                `
                counter++;
            }else{
                navMenu.innerHTML += `
                    <a href="#" data-id="${element}" class="nav-item">
                        <img src="/assets/${element.toLowerCase()}.svg" alt="${element} Icon" class="nav-icon">
                        <span>${element}</span>
                    </a>
                `
            }
        });
    }

    const userTrigger = document.getElementById("userTrigger");
    const userDropdown = document.getElementById("userDropdown");
    const logoutButton = document.getElementById("logout");

    userTrigger.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle("show");
    });
    document.addEventListener("click", function (e) {
        if (!userTrigger.contains(e.target)) {
            userDropdown.classList.remove("show");
        }
    });

    logoutButton.addEventListener("click", async function () {
        await authService.logout();
    });

    let moduleActive = document.querySelector(".nav-item.active");

    if (moduleActive) {
        const moduleName = moduleActive.getAttribute("data-id");
        window.router.navigateModule(moduleName);
    }
    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach((item) => {
        item.addEventListener("click", function (e) {
        e.preventDefault();
        navItems.forEach((i) => i.classList.remove("active"));
        this.classList.add("active");
        window.router.navigateModule(this.getAttribute("data-id"));

        // In a real application, you would load the corresponding module here
        const moduleName = this.querySelector("span").textContent;
        console.log(`Loading module: ${moduleName}`);
        });
    });
}