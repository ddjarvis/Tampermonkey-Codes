function fileSafe(input)
{
	var proc = input, output;
	proc = proc.replace(/[^\p{L}\p{N}\p{P}\p{Z}]/gu, '');
	proc = proc.replace(/( +<+ +(?!.*>))|((?<!<.*) +>+ +)|(( ?:+ +)|( +:+ ?)|( +:+ +))/g," - ");
	proc = proc.replace(/([?*"]+)/g,"");
	proc = proc.replace(/(<+(?!.*>))|((?<!<.*)>+)|((?<!<.*)(?<=>.*)>)|([\/\\|]+)|(:+)/g," ");
	proc = proc.replace(/</g,"(").replace(/>/g,")");
	proc = proc.replace(/( {2,})/g," ");
	output = proc.trim();
	return output;
}

var groupName = document.querySelector('div[role="main"] > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > div > span[dir="auto"]').innerText.trim();
var groupNameCleaned = fileSafe(groupName);
console.log(groupNameCleaned);
