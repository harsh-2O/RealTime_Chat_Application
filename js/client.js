
const socket = io("http://localhost:8000");

const form = document.getElementById('send-container');
const msg = document.getElementById('sendMsg');
const msg_container = document.querySelector(".container");

const name = prompt("Enter your name to join : ");


