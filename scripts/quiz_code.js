let step = 0
let correct = 0
function showQuestion(questionNumber) {
    document.querySelector('.titleQuestion').innerHTML = quiz[step]['title']
    document.querySelector(".question").innerHTML = quiz[step]['question']
    let choice = ''
    for (let key in quiz[step]['choices']) {
        choice += `
                        <div id="${key}" class="answerVariant">
                        ${quiz[step]['choices'][key]}
                        <svg width="35" height="23" viewBox="0 0 35 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.6122 8.625H0V14.375H23.6122V23L35 11.5L23.6122 0V8.625Z" fill="#FFC900"/>
                        </svg>

                        </div>
                        
                       `
    }
    document.querySelector(".answer").innerHTML = choice
    document.querySelector('.nextQButton').style.cssText = 'display: none;'
    document.querySelector('.question').classList.remove('font-sizer')


    step++


}

function next() {
    if (step === quiz.length) {
        console.log()
        document.querySelector('.nextQButton').setAttribute('data-target','#carousel-example-generic')
        document.querySelector('.nextQButton').setAttribute('data-slide-to','2')
        let result = document.createElement('div')
        result.innerHTML = correct + ' ' + '/ 12'
        document.querySelector('.result').appendChild(result)
    }
    else {
        showQuestion(step)
    }
}

window.onload = function() {

    document.onclick = function(event) {
        event.stopPropagation()
        if (event.target.classList.contains('answerVariant')) {
            document.querySelector('.nextQButton').style.cssText = 'display: block;'

            if (event.target.id == quiz[step-1]['answer']) {
                console.log('right answer')
                event.target.classList.add('correct')
                correct++
                console.log(correct)
                document.querySelector('.titleQuestion').innerHTML = desc[step-1]['title']
                document.querySelector('.question').innerHTML = desc[step-1]['description']
                document.querySelector('.question').classList.add('font-sizer')

            }
            else {
                console.log('wrong answer')
                event.target.classList.add('wrong')

                const answerLen = document.querySelector(".answer").children.length
                for (let i=0; i<answerLen; i++) {
                    if (parseInt(document.querySelector(".answer").children[i].id) === quiz[step-1]['answer']) {
                        document.querySelector(".answer").children[i].classList.add('correct')
                    }

                }
                document.querySelector('.titleQuestion').innerHTML = desc[step-1]['title']
                document.querySelector('.question').innerHTML = desc[step-1]['description']
                document.querySelector('.question').classList.add('font-sizer')




            }

        unclickableOptions()

        }
    }
    function unclickableOptions() {
        for (let key in quiz[step-1]['choices']) {
            document.querySelector(".answer").children[key].classList.add('already-answered')
        }
    }

    showQuestion(step)
}