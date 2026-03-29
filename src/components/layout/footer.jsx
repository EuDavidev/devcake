import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-browndev/20 bg-rosecake py-12">
            <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 md:grid-cols-4 md:px-6">
                <div className="space-y-3">
                    <h3 className="font-title text-2xl font-extrabold text-browndev">DevCake</h3>
                    <p className="text-sm text-browndev/80">
                        Receitas artesanais criadas para acompanhar seu código e café.
                    </p>
                </div>

                <div className="space-y-3">
                    <h4 className="font-title text-lg font-bold">Navegação</h4>
                    <ul className="space-y-2 text-sm text-browndev/85">
                        <li><Link href="#inicio">Início</Link></li>
                        <li><Link href="#produtos">Produtos</Link></li>
                        <li><Link href="#sobre">Sobre</Link></li>
                        <li><Link href="#contato">Contato</Link></li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h4 className="font-title text-lg font-bold">Contato</h4>
                    <ul className="space-y-2 text-sm text-browndev/85">
                        <li>WhatsApp: (11) 99999-9999</li>
                        <li>Instagram: @devcake.oficial</li>
                        <li>Email: contato@devcake.com</li>
                    </ul>
                </div>

                <div className="space-y-3">
                    <h4 className="font-title text-lg font-bold">Horários</h4>
                    <ul className="space-y-2 text-sm text-browndev/85">
                        <li>Seg-Sex: 08h - 19h</li>
                        <li>Sab: 09h - 17h</li>
                        <li>Dom: Encomendas online</li>
                    </ul>
                </div>
            </div>
            <p className="mt-8 text-center text-sm text-browndev/75">
                {new Date().getFullYear()} DevCake. Todos os direitos reservados.
            </p>
        </footer>
    );
}
