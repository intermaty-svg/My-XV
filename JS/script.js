/* =========================================================
   CONFIGURACIÓN
========================================================= */

/* Número de WhatsApp que recibirá las confirmaciones */
const numeroWhatsApp = "525567045290";


/* =========================================================
   YOUTUBE
========================================================= */

/*
    Canción:
    Say Yes To Heaven - Lana Del Rey

    Video ID:
    MiAoetOXKcY
*/

const youtubeVideoID = "MiAoetOXKcY";

let youtubePlayer = null;
let musicaPreparada = false;


/* =========================================================
   CONTADOR
========================================================= */

const fechaEvento = new Date(
    "November 21, 2026 20:00:00"
).getTime();


function actualizarContador() {

    const ahora = new Date().getTime();

    const diferencia = fechaEvento - ahora;


    if (diferencia <= 0) {

        document.getElementById("days").textContent = "0";
        document.getElementById("hours").textContent = "0";
        document.getElementById("minutes").textContent = "0";
        document.getElementById("seconds").textContent = "0";

        return;
    }


    const dias = Math.floor(
        diferencia /
        (1000 * 60 * 60 * 24)
    );


    const horas = Math.floor(
        (
            diferencia %
            (1000 * 60 * 60 * 24)
        ) /
        (1000 * 60 * 60)
    );


    const minutos = Math.floor(
        (
            diferencia %
            (1000 * 60 * 60)
        ) /
        (1000 * 60)
    );


    const segundos = Math.floor(
        (
            diferencia %
            (1000 * 60)
        ) /
        1000
    );


    document.getElementById("days").textContent =
        dias;

    document.getElementById("hours").textContent =
        String(horas).padStart(2, "0");

    document.getElementById("minutes").textContent =
        String(minutos).padStart(2, "0");

    document.getElementById("seconds").textContent =
        String(segundos).padStart(2, "0");
}


actualizarContador();

setInterval(
    actualizarContador,
    1000
);


/* =========================================================
   CARGAR API DE YOUTUBE
========================================================= */

const youtubeScript =
    document.createElement("script");

youtubeScript.src =
    "https://www.youtube.com/iframe_api";

document.head.appendChild(
    youtubeScript
);


/* =========================================================
   YOUTUBE API
========================================================= */

window.onYouTubeIframeAPIReady =
    function () {

        youtubePlayer =
            new YT.Player(
                "youtubePlayer",
                {

                    height: "1",
                    width: "1",

                    videoId:
                        youtubeVideoID,

                    playerVars: {

                        autoplay: 0,

                        controls: 0,

                        loop: 1,

                        playlist:
                            youtubeVideoID,

                        rel: 0,

                        playsinline: 1

                    },

                    events: {

                        onReady:
                            function () {

                                musicaPreparada =
                                    true;

                            }

                    }

                }
            );

    };


/* =========================================================
   ABRIR INVITACIÓN
========================================================= */

const openInvitation =
    document.getElementById(
        "openInvitation"
    );


openInvitation.addEventListener(
    "click",
    function () {

        const welcomeScreen =
            document.getElementById(
                "welcomeScreen"
            );


        welcomeScreen.classList.add(
            "hidden"
        );


        /*
            Intentar iniciar música
            después del clic del usuario.
        */

        if (
            youtubePlayer &&
            musicaPreparada
        ) {

            youtubePlayer.playVideo();

            document.getElementById(
                "musicButton"
            ).textContent = "♫";

        }

    }
);


/* =========================================================
   BOTÓN DE MÚSICA
========================================================= */

const musicButton =
    document.getElementById(
        "musicButton"
    );


musicButton.addEventListener(
    "click",
    function () {

        if (
            !youtubePlayer ||
            !musicaPreparada
        ) {

            return;

        }


        const estado =
            youtubePlayer.getPlayerState();


        if (
            estado ===
            YT.PlayerState.PLAYING
        ) {

            youtubePlayer.pauseVideo();

            musicButton.textContent =
                "🔇";

        } else {

            youtubePlayer.playVideo();

            musicButton.textContent =
                "♫";

        }

    }
);


/* =========================================================
   CONFIRMACIÓN DE WHATSAPP
========================================================= */

const confirmationForm =
    document.getElementById(
        "confirmationForm"
    );


confirmationForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* =========================
           NOMBRE
        ========================= */

        const nombre =
            document
                .getElementById(
                    "guestName"
                )
                .value
                .trim();


        /* =========================
           ACOMPAÑANTES
        ========================= */

        const acompanantes =
            document
                .getElementById(
                    "guests"
                )
                .value;


        /* =========================
           ASISTENCIA
        ========================= */

        const asistencia =
            document.querySelector(
                'input[name="attendance"]:checked'
            );


        /* =========================
           VALIDAR NOMBRE
        ========================= */

        if (!nombre) {

            alert(
                "Por favor escribe tu nombre completo."
            );

            return;

        }


        /* =========================
           VALIDAR ASISTENCIA
        ========================= */

        if (!asistencia) {

            alert(
                "Por favor selecciona si podrás asistir."
            );

            return;

        }


        /* =========================
           TEXTO ASISTENCIA
        ========================= */

        let textoAsistencia;


        if (
            asistencia.value === "si"
        ) {

            textoAsistencia =
                "Sí asistiré 💙";

        } else {

            textoAsistencia =
                "No podré asistir";

        }


        /* =========================
           TEXTO ACOMPAÑANTES
        ========================= */

        let textoAcompanantes;


        if (
            acompanantes === "0"
        ) {

            textoAcompanantes =
                "Solo yo";

        } else {

            textoAcompanantes =
                acompanantes +
                " acompañante(s)";

        }


        /* =========================
           MENSAJE
        ========================= */

        const mensaje = `🎀 CONFIRMACIÓN DE ASISTENCIA 🎀

✨ XV AÑOS DE ITZEL ✨

👤 Invitado:
${nombre}

💌 Confirmación:
${textoAsistencia}

👥 Acompañantes:
${textoAcompanantes}

📅 Fecha:
21 de noviembre de 2026

Gracias por formar parte de este día tan especial. 🦋💙`;


        /* =========================
           CODIFICAR MENSAJE
        ========================= */

        const mensajeCodificado =
            encodeURIComponent(
                mensaje
            );


        /* =========================
           CREAR WHATSAPP
        ========================= */

        const whatsappURL =
            "https://wa.me/" +
            numeroWhatsApp +
            "?text=" +
            mensajeCodificado;


        /* =========================
           ABRIR WHATSAPP
        ========================= */

        window.open(
            whatsappURL,
            "_blank"
        );

    }
);


/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const elementos =
    document.querySelectorAll(
        ".section-container"
    );


const observer =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


elementos.forEach(
    function (elemento) {

        observer.observe(
            elemento
        );

    }
);
