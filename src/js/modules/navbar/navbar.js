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
                        <i>📊</i>
                        <span>${element}</span>
                    </a>
                `
                counter++;
            }else{
                navMenu.innerHTML += `
                    <a href="#" data-id="${element}" class="nav-item">
                        <i>📊</i>
                        <span>${element}</span>
                    </a>
                `
            }
        });
    }
}