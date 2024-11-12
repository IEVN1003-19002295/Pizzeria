import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pizzeria',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pizzeria.component.html',
  styleUrls: ['./pizzeria.component.css']
})
export class PizzeriaComponent {

  cliente = {
    nombre: '',
    direccion: '',
    telefono: ''
  };

  pizzaSeleccionada = {
    tamanio: '',
    ingredientes: {
      jamon: false,
      pina: false,
      champinones: false
    },
    cantidad: 1
  };

  pizzas: any[] = [];
  ventasDelDia: any[] = [];
  ventasTotales: number = 0;

  constructor() {
    this.cargarVentas();
  }

  agregarPizza() {
    const ingredientesSeleccionados = [];

    for (const [ingrediente, seleccionado] of Object.entries(this.pizzaSeleccionada.ingredientes)) {
      if (seleccionado) {
        ingredientesSeleccionados.push(ingrediente);
      }
    }

    const precioTamanio = this.obtenerPrecioTamanio(this.pizzaSeleccionada.tamanio);
    const precioIngredientes = ingredientesSeleccionados.length * 10;
    const subtotal = (precioTamanio + precioIngredientes) * this.pizzaSeleccionada.cantidad;

    this.pizzas.push({
      tamanio: this.pizzaSeleccionada.tamanio,
      ingredientes: ingredientesSeleccionados,
      cantidad: this.pizzaSeleccionada.cantidad,
      subtotal: subtotal
    });

    this.guardarVentas();
  }

  quitarPizza(pizza: any) {
    const index = this.pizzas.indexOf(pizza);
    if (index !== -1) {
      this.pizzas.splice(index, 1);
    }
    this.guardarVentas();
  }

  terminarPedido() {
    const totalPedido = this.pizzas.reduce((total, pizza) => total + pizza.subtotal, 0);

    if (confirm(`El total del pedido es: $${totalPedido}. ¿Está de acuerdo?`)) {
      const venta = {
        cliente: this.cliente.nombre,
        total: totalPedido
      };
      this.ventasDelDia.push(venta);
      this.ventasTotales += totalPedido;
      this.guardarVentas();
      this.limpiarFormulario();
    }
  }

  mostrarVentas() {
    alert(`Ventas totales: $${this.ventasTotales}`);
  }

  obtenerPrecioTamanio(tamanio: string): number {
    switch (tamanio) {
      case 'chica': return 40;
      case 'mediana': return 80;
      case 'grande': return 120;
      default: return 0;
    }
  }

  guardarVentas() {
    localStorage.setItem('ventasDelDia', JSON.stringify(this.ventasDelDia));
    localStorage.setItem('ventasTotales', JSON.stringify(this.ventasTotales));
  }

  cargarVentas() {
    const ventasDelDia = localStorage.getItem('ventasDelDia');
    const ventasTotales = localStorage.getItem('ventasTotales');

    if (ventasDelDia) {
      this.ventasDelDia = JSON.parse(ventasDelDia);
    }

    if (ventasTotales) {
      this.ventasTotales = JSON.parse(ventasTotales);
    }
  }

  limpiarFormulario() {
    this.cliente = { nombre: '', direccion: '', telefono: '' };
    this.pizzaSeleccionada = { tamanio: '', ingredientes: { jamon: false, pina: false, champinones: false }, cantidad: 1 };
    this.pizzas = [];
  }
}
