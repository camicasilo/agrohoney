<?php
/**
 * Plugin Name: AgroHoney Quiz Recomendador
 * Description: Shortcode [quiz_recomendador] para recomendar el producto ideal.
 * Version: 1.0
 * Author: Jules
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_shortcode( 'quiz_recomendador', 'agrohoney_quiz_recomendador_shortcode' );
function agrohoney_quiz_recomendador_shortcode() {
    ob_start();
    ?>
    <div id="agrohoney-quiz-container" style="background: #f4f4f4; padding: 20px; border-radius: 8px; max-width: 600px; margin: auto;">
        <h3 style="text-align: center;">Descubre tu miel ideal</h3>

        <div id="quiz-question-1" class="quiz-step">
            <p><strong>1. ¿Cuál es tu principal necesidad de salud?</strong></p>
            <button class="quiz-btn" data-next="2" data-score="10" style="margin: 5px; padding: 10px;">Bienestar general</button>
            <button class="quiz-btn" data-next="2" data-score="20" style="margin: 5px; padding: 10px;">Problemas digestivos</button>
            <button class="quiz-btn" data-next="2" data-score="30" style="margin: 5px; padding: 10px;">Fuerte soporte inmune</button>
        </div>

        <div id="quiz-question-2" class="quiz-step" style="display:none;">
            <p><strong>2. ¿Con qué frecuencia consumes miel?</strong></p>
            <button class="quiz-btn" data-next="3" data-score="0" style="margin: 5px; padding: 10px;">Diariamente</button>
            <button class="quiz-btn" data-next="3" data-score="0" style="margin: 5px; padding: 10px;">Solo cuando me siento mal</button>
        </div>

        <div id="quiz-question-3" class="quiz-step" style="display:none;">
            <p><strong>3. ¿Prefieres un sabor suave o fuerte?</strong></p>
            <button class="quiz-btn" data-next="result" data-score="0" style="margin: 5px; padding: 10px;">Suave</button>
            <button class="quiz-btn" data-next="result" data-score="5" style="margin: 5px; padding: 10px;">Fuerte</button>
        </div>

        <div id="quiz-result" class="quiz-step" style="display:none; text-align: center;">
            <h4 id="result-title"></h4>
            <p id="result-desc"></p>
            <a href="/shop/" class="button" style="display:inline-block; margin-top: 15px;">Ir a la tienda</a>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            let totalScore = 0;
            const buttons = document.querySelectorAll('.quiz-btn');

            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const nextStep = this.getAttribute('data-next');
                    const score = parseInt(this.getAttribute('data-score'), 10);

                    totalScore += score;

                    this.parentElement.style.display = 'none';

                    if(nextStep === 'result') {
                        document.getElementById('quiz-result').style.display = 'block';
                        let recommendation = "Miel Esencial (UMF 10+)";
                        let desc = "Ideal para el bienestar diario y energía natural.";

                        if(totalScore >= 20 && totalScore < 30) {
                            recommendation = "Miel Premium (UMF 15+ o 20+)";
                            desc = "Perfecta para calmar el sistema digestivo y mejorar las defensas.";
                        } else if(totalScore >= 30) {
                            recommendation = "Miel de Lujo (UMF 24+ o superior)";
                            desc = "Potente acción antibacteriana, para cuando necesitas el máximo soporte.";
                        }

                        document.getElementById('result-title').innerText = "Te recomendamos: " + recommendation;
                        document.getElementById('result-desc').innerText = desc;

                    } else {
                        document.getElementById('quiz-question-' + nextStep).style.display = 'block';
                    }
                });
            });
        });
    </script>
    <?php
    return ob_get_clean();
}
