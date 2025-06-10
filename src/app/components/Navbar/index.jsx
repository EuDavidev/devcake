import estilos from "./Navbar.module.css";

export default function Navbar (){
    return(
        
    <div className={navbar}>
        <div className={logo}><a href="#">Meu Site</a></div>
            <div className={menu-icon} onclick="toggleMenu()">☰</div>
        <div className={menu}>
            <a href="#">Início</a>
            <a href="#">Sobre</a>
            <a href="#">Serviços</a>
            <a href="#">Contato</a>
        </div>
    </div>
    );
}