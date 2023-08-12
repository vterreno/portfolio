import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})

export class ProyectosComponent implements OnInit {
  
  constructor() {}
  
  ngOnInit(): void {
  }

  isPopupVisible = false;

  togglePopup() {
    const body = document.getElementById('proyectos');

    body?.classList.toggle('blur');
    this.isPopupVisible = !this.isPopupVisible;
  }

}
