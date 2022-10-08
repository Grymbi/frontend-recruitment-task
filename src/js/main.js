//basic definitions
var $ = a => document.querySelector(a);
var list = document.body.classList;
//def end



//button
$('.buttonClicks').addEventListener('click', () => {
    $('.overlay').classList.remove('hidden');
	$('.alert').classList.remove('hidden');
	localStorage.setItem('clicks', parseInt(localStorage.getItem('clicks'))+1)
	$('.alText').innerHTML = 'You have clicked <b>' + localStorage.getItem('clicks') + ' </b>times to related button';
	if(parseInt(localStorage.getItem('clicks'))==5){
		$('.reset').classList.remove('hidden');
	}
});

$('.reset').addEventListener('click', () => {
	$('.reset').classList.add('hidden')
	localStorage.setItem('clicks', 0)
	$('.alText').innerHTML = 'You have clicked <b>' + localStorage.getItem('clicks') + ' </b>times to related button';
});

$('.overlay').addEventListener('click', () => {
    $('.overlay').classList.add('hidden');
	$('.alert').classList.add('hidden')
});

$('.xButton').addEventListener('click', () => {
    $('.overlay').classList.add('hidden');
	$('.alert').classList.add('hidden')
});

$('.overlay').addEventListener('click', () => {
    $('.overlay').classList.add('hidden');
	$('.alert').classList.add('hidden')
});
//button end



//themes

//dark theme
$('.dark').addEventListener('click', function () {
    let darkThemeEnabled = list.toggle('dark-theme');
    localStorage.setItem('dark-theme-enabled', darkThemeEnabled);
	if (list.contains("contrast-theme")) {
		list.remove('contrast-theme');
		list.add('dark-theme');
	}
});

if (JSON.parse(localStorage.getItem('dark-theme-enabled'))) {
    list.add('dark-theme');
}



//contrast theme
$('.contrast').addEventListener('click', function () {
    let contrastThemeEnabled = list.toggle('contrast-theme');
    localStorage.setItem('contrast-theme-enabled', contrastThemeEnabled);
	if (list.contains("dark-theme")) {
		list.remove('dark-theme');
		list.add('contrast-theme');
	}
});

if (JSON.parse(localStorage.getItem('contrast-theme-enabled'))) {
    list.add('contrast-theme');
}
///themes end




//font sizes
var font = ['font-s','font-m','font-b'];
var i = 1;
$('.font').addEventListener('click', function () {
	if(i==3){
		list.remove(font[i-1]);
		i=0;		
	}
	list.remove(font[i-1]);
	list.add(font[i]);
	list.remove(font[i+1]);
	i++;
	
	// for (i=0; i<font.length; i++ ){
	// 	if(list.contains(font[i])){
	// 		list.remove(font[i]);
	// 		list.add(font[i+1]);
	// 	}else if(!list.contains(font[i])){
	// 		list.add(font[i]);
	// 	}
	// }
});
//font sizes end




//text2speech
onload = function() {
	if ('speechSynthesis' in window) with(speechSynthesis) {

		var playEle = $('#play');
		var pauseEle = $('#pause');
		var stopEle = $('#stop');
		var flag = false;

		playEle.addEventListener('click', onClickPlay);
		pauseEle.addEventListener('click', onClickPause);
		stopEle.addEventListener('click', onClickStop);

		function onClickPlay() {
			if (!flag) {
				flag = true;
				utterance = new SpeechSynthesisUtterance(document.querySelector('article').textContent);
				utterance.voice = getVoices()[0];
				utterance.onend = function() {
					flag = false;
					playEle.className = pauseEle.className = '';
					stopEle.className = 'stopped';
				};
				playEle.className = 'played';
				stopEle.className = '';
				speak(utterance);
			}
			if (paused) { /* unpause/resume narration */
				playEle.className = 'played';
				pauseEle.className = '';
				resume();
			}
		}

		function onClickPause() {
			if (speaking && !paused) { /* pause narration */
				pauseEle.className = 'paused';
				playEle.className = '';
				pause();
			}
		}

		function onClickStop() {
			if (speaking) { /* stop narration */
				/* for safari */
				stopEle.className = 'stopped';
				playEle.className = pauseEle.className = '';
				flag = false;
				cancel();

			}
		}

	}

	else { /* speech synthesis not supported */
		msg = document.createElement('h5');
		msg.textContent = "Detected no support for Speech Synthesis";
		msg.style.textAlign = 'center';
		msg.style.backgroundColor = 'red';
		msg.style.color = 'white';
		msg.style.marginTop = msg.style.marginBottom = 0;
		document.body.insertBefore(msg, document.querySelector('div'));
	}

}
//text2speech end