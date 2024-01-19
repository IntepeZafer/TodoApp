"use strict";
        
        let sonuc;
        let ul = document.querySelector("#task-list");
        let txtTaskName = document.querySelector("#txtTaskName");
        let btnAddNewTask = document.querySelector("#btnAddNewTask");

        let gorevListesi = [
            {"id": 1, "gorevAdi": "Görev 1"},
            {"id": 2, "gorevAdi": "Görev 2"},
            {"id": 3, "gorevAdi": "Görev 3"},
            {"id": 4, "gorevAdi": "Görev 4"},
        ];
        displayText();
        function displayText(){
            ul.innerHTML = "";
            for(let gorev of gorevListesi) {
                let li = `
                    <li class="task list-group-item">
                        <div class="form-check">
                            <input type="checkbox" id="${gorev.id}" class="form-check-input">
                            <label for="${gorev.id}" class="form-check-label">${gorev.gorevAdi}</label>
                        </div>

                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-xmark"></i> Sil</a></li>
                                <li><a class="dropdown-item" href="#"><i class="fa-solid fa-plus"></i> Ekle</a></li>
                            </ul>
                        </div>
                    </li>
                `;
                ul.insertAdjacentHTML("beforeend", li);           
            };
        };

        function newTask(e){
            if(txtTaskName.value === ""){
                alert("Boş Değer Girilemez");
            }else{
                gorevListesi.push({"id": gorevListesi.length + 1, "gorevAdi": txtTaskName.value});
                txtTaskName.value = "";
            displayText();
            }
            e.preventDefault();
        }
        btnAddNewTask.addEventListener("click" , newTask);