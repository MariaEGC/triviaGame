$.fn.trivia = function() {
    var _t = this;
    _t.userPick = null;
    _t.answers = {
        correct: 0,
        incorrect: 0
    };
    _t.images = null;
    _t.count = 30;
    _t.current = 0;
    _t.questions = [{
        question: "Which of these is not from Marvel?",
        choices: ["The Flash", "X-Men", "Iron Man", "Deadpool"],
        correct: 0
    }, {
        question: "How many stones are on the infinity gauntlet?",
        choices: [" 4 ", " 6 ", " 7 ", " 5 "],
        correct: 1

    }, {
        question: "What animal bit Peter Parker to give him powers?",
        choices: ["Rat", "Ant", "Dog", "Spider"],
        correct: 3

    }, {
        question: "Who is the ruler of the country of Latveria?",
        choices: ["Thor", "Dr. Doom", "Black Panther", "Loki"],
        correct: 1

    }, {
        question: "What alien race is in war with the Kree and happen to be shape shifters?",
        choices: ["Skrulls", "Kree", "Humans", "Plants"],
        correct: 0

    }, {
        question: "Which of these is a child of Venom?",
        choices: ["Toxin", "Riot", "Carnage", "Hybrid"],
        correct: 2

    }, {
        question: "What is the name of motorcycle riding Ghost Rider?",
        choices: ["Unknown", "John Miller", "Johnny Blaze", "Mark Smith"],
        correct: 2

    }, {
        question: "What is Dr. Strange's title in the magic world?",
        choices: ["Apprentice", "Magician", "Doctor", "Sorceror Supreme"],
        correct: 3
    }, {
        question: "What is Captain America's best friends name?",
        choices: ["Bucky", "Chuck", "Mason", "James"],
        correct: 0
    }];
    _t.ask = function() {
        if (_t.questions[_t.current]) {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
            $("#question_div").html(_t.questions[_t.current].question);
            var choicesArr = _t.questions[_t.current].choices;
            var buttonsArr = [];

            for (var i = 0; i < choicesArr.length; i++) {
                var button = $('<button>');
                button.text(choicesArr[i]);
                button.attr('data-id', i);
                $('#choices_div').append(button);
            }
            window.triviaCounter = setInterval(_t.timer, 1000);
        } else {
            $('body').append($('<div />', {
                text: 'Unanswered: ' + (
                    _t.questions.length - (_t.answers.correct + _t.answers.incorrect)),
                class: 'result'
            }));
            $('#start_button').text('Restart').appendTo('body').show();
        }
    };
    _t.timer = function() {
        _t.count--;
        if (_t.count <= 0) {
            setTimeout(function() {
                _t.nextQ();
            });

        } else {
            $("#timer").html("Time remaining: " + "00:" + _t.count + " secs");
        }
    };
    _t.nextQ = function() {
        _t.current++;
        clearInterval(window.triviaCounter);
        _t.count = 30;
        $('#timer').html("");
        setTimeout(function() {
            _t.cleanUp();
            _t.ask();
        }, 5000)
    };
    _t.cleanUp = function() {
        $('div[id]').each(function(item) {
            $(this).html('');
        });
        $('.correct').html('Correct answers: ' + _t.answers.correct);
        $('.incorrect').html('Incorrect answers: ' + _t.answers.incorrect);
    };
    _t.answer = function(correct) {
        var string = correct ? 'correct' : 'incorrect';
        _t.answers[string]++;
        $('.' + string).html(string + ' answers: ' + _t.answers[string]);
    };
    return _t;
};
var Trivia;

$("#start_button").click(function() {
    $(this).hide();
    $('.result').remove();
    $('div').html('');
    Trivia = new $(window).trivia();
    Trivia.ask();
});

$('#choices_div').on('click', 'button', function(e) {
    var userPick = $(this).data("id"),
        _t = Trivia || $(window).trivia(),
        index = _t.questions[_t.current].correct,
        correct = _t.questions[_t.current].choices[index];

    if (userPick !== index) {
        $('#choices_div').text("Wrong Answer! The correct answer was: " + correct);
        _t.answer(false);
    } else {
        $('#choices_div').text("Correct!!! The correct answer was: " + correct);
        _t.answer(true);
    }
    _t.nextQ();
});