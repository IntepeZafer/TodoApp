"use strict";
        let sonuc;
        let ul = document.querySelector("#task-list");
        let txtTaskName = document.querySelector("#txtTaskName");
        let btnAddNewTask = document.querySelector("#btnAddNewTask");
        let btnClear = document.querySelector("#btnClear");
        let inputTag = document.querySelector("input");
        let filters = document.querySelectorAll(".filters span");
        let editId;
        let isEditTask = false;

        let gorevListesi = [];
        if(localStorage.getItem("gorevListesi") != null){
            gorevListesi = JSON.parse(localStorage.getItem("gorevListesi"));
        }
        displayText("all");
        function displayText(filters){
            ul.innerHTML = "";
            if(gorevListesi.length == 0){
                ul.innerHTML = "<p class = 'p-3'>Tüm Görevler Silindi</p>"
            }else{
                for(let gorev of gorevListesi) {
                    let complated = gorev.durum == "complated" ? "checked" : "";
                    if(gorev.durum == filters || filters == "all"){
                        let li = `
                        <li class="task list-group-item">
                            <div class="form-check">
                                <input type="checkbox" onclick="updateStatus(this)" id="${gorev.id}" class="form-check-input" ${complated}>
                                <label for="${gorev.id}" class="form-check-label ${complated}">${gorev.gorevAdi}</label>
                            </div>
    
                            <div class="dropdown">
                                <button class="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="fa-solid fa-ellipsis"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li><a onclick="deleteTask(${gorev.id})" class="dropdown-item" href="#"><i class="fa-solid fa-xmark"></i> Sil</a></li>
                                    <li><a onclick='editTask(${gorev.id} , "${gorev.gorevAdi}")' class="dropdown-item" href="#"><i class="fa-solid fa-plus"></i> Ekle</a></li>
                                </ul>
                            </div>
                        </li>
                    `;
                    ul.insertAdjacentHTML("beforeend", li);
                    }
                               
                };
            }
        };

        function newTask(e){
            if(txtTaskName.value === ""){
                alert("Boş Değer Girilemez");
            }else{
                if(!isEditTask){
                    gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": txtTaskName.value , "durum" : "pending"});
                    txtTaskName.value = "";
                }else{
                    for(let gorev of gorevListesi){
                        if(gorev.id == editId){
                            gorev.gorevAdi = txtTaskName.value;
                        }
                        isEditTask = false;
                    }
                }
            }
            displayText(document.querySelector("span.active").id);
            localStorage.setItem("gorevListesi" , JSON.stringify(gorevListesi));
            e.preventDefault();
        }
        btnAddNewTask.addEventListener("click" , newTask);
        
        function deleteTask(id){
            let deleteIndex;
            deleteIndex = gorevListesi.findIndex(gorev => gorev.id == id);
            gorevListesi.splice(deleteIndex , 1);
            displayText(document.querySelector("span.active").id);
            localStorage.setItem("gorevListesi" , JSON.stringify(gorevListesi));
        }
        function editTask(taskId , taskName){
            editId = taskId;
            isEditTask = true;
            txtTaskName.value = taskName;
            txtTaskName.focus();
            txtTaskName.classList.add("active");

        }
        btnClear.addEventListener("click" , allDeleteTask);
        function allDeleteTask(){
            let confrim = confirm("Tüm Görevleri Silmek İstediğinizden Emin Misiniz");
            if(confrim){
                gorevListesi.splice(0 , gorevListesi.length);
                localStorage.setItem("gorevListesi" , JSON.stringify(gorevListesi));
                displayText();
            }else{

            }
        }
        function updateStatus(selectedTask){
            let label = selectedTask.nextElementSibling;
            let durum;
            if(selectedTask.checked){
                label.classList.add("checked")
                durum = "complated";
            }else{
                label.classList.remove("checked")
                durum = "pending";
            }
            for(let gorev of gorevListesi){
                if(gorev.id == selectedTask.id){
                    gorev.durum = durum;
                }
            }
            displayText(document.querySelector("span.active").id)
            localStorage.setItem("gorevListesi" , JSON.stringify(gorevListesi));
        }
        for(let span of filters){
            span.addEventListener("click" , () => {
                document.querySelector("span.active").classList.remove("active");
                span.classList.add("active");
                displayText(span.id);
            })
            localStorage.setItem("gorevListesi" , JSON.stringify(gorevListesi));
        }