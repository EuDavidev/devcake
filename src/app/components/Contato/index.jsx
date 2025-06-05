import estilos from "./Contato.module.css";
import Image from "next/image";
import Facebook from "../../../../public/assets/icons/facebook.png";
import Instagram from "../../../../public/assets/icons/instagram.png";
import Tiktok from "../../../../public/assets/icons/tiktok.png";
import Whatsapp from "../../../../public/assets/icons/whatsapp.png";
import Logo from "../../../../public/logo-sem-fundo.png";

export default function Contato(){
    return(
        <div className={estilos.container_main}>
            <div className={estilos.container_titulo}>
                <h1>Contato</h1>
            </div>
            <div className={estilos.container_conteudo}>
                <section className={estilos.container_contato}>
                    <div className={estilos.container_texto}>
                        <h2>Entre em contatos conosco através de nossas redes!</h2>                        
                        <h3>Tel.:</h3>
                        <p>(77) 7 7777-7777</p>
                        <h3>E-mal:</h3>
                        <p>contato@email.com</p>

                    </div>
                    <div className={estilos.container_redes}>
                        <a href="#"><Image src={Facebook} alt={"facebook"}/></a>
                        <a href="#"><Image src={Instagram} alt={"instagram"}/></a>
                        <a href="#"><Image src={Tiktok} alt={"tiktok"}/></a>
                        <a href="#"><Image src={Whatsapp} alt={"whatsapp"}/></a>
                    </div>
                </section>
                <section className={estilos.container_mapa}>
                    <h2>Localização</h2>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7801.23381169014!2d-38.43114082415091!3d-12.138343243614251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x716bc4eb8176ec5%3A0x602e8a7cb12b436f!2sSENAI%20Alagoinhas!5e0!3m2!1spt-BR!2sbr!4v1749064272056!5m2!1spt-BR!2sbr"  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </section>                
            </div>
            <div className={estilos.container_logo}>
                    <Image src={Logo} alt={"logo"} />
            </div>
            <div className={estilos.container_rodape}>
                <p>Todos os direitos reservados!</p>
            </div>
        </div>
    );
}