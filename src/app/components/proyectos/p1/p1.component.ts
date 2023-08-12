import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-p1',
  templateUrl: './p1.component.html',
  styleUrls: ['./p1.component.css']
})
export class P1Component implements OnInit {
  @Output() close = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  closePopup() {
    this.close.emit();
    const body = document.getElementById('proyectos')
  }

}
