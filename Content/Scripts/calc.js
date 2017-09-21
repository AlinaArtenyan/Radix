var HexValues = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
    HexBinaryArray = ['0000', '0001', '0010', '0011', '0100', '0101', '0110', '0111', '1000', '1001', '1010', '1011', '1100', '1101', '1110', '1111'],
    OctalBinaryArray = ['000', '001', '010', '011', '100', '101', '110', '111'],
    OctalValues = ['0', '1', '2', '3', '4', '5', '6', '7'],
    ValidKeys = [8, 9],
    ValidDigit = ['0123456789', '0123456789ABCDEFabcdef', '01234567', '01'];

window.onload = function () {
	$('input').bind('keyup keypress', function (e) {
		if (ValidKeys.indexOf(e.keyCode) != -1) {
			return true;
		} else {
			return (ValidDigit[$(this).attr('tabindex')].indexOf(String.fromCharCode(e.which)) != -1);
		}
	});
	$('input').keypress(function (e) {
		if ((0 == this.value.length && 48 == e.which)) {
			return false;
		}
	});

var radix2 = $('#radix2'),
	radix8 = $('#radix8'),
	radix10 = $('#radix10'),
	radix16 = $('#radix16');
console.log(radix2.val());
radix2.on('input', function () {
    convertNumber(+radix2.val(), 2);
});
radix8.on('input', function () {
    convertNumber(radix8.val(), 8);
});
radix10.on('input', function () {
	console.log(1);
    convertNumber(radix10.val(), 10);
});
radix16.on('input', function () {
	console.log(16);
    convertNumber(+radix16.val(), 16);
});

function convertNumber(inputValue, radix) {

	switch (radix) {
		case 2:
			radix16.val(binaryToHex(inputValue));
			radix10.val(binaryToDecimal(inputValue));
			radix8.val(binaryToOctal(inputValue));
			break;
		case 8:
			radix16.val(octToHex(inputValue));
			radix10.val(octToDecimal(inputValue));
			radix2.val(octToBinary(inputValue));
			break;
		case 10:
			radix16.val(decimalToHex(inputValue));
			radix8.val(decimal_to_binary_octal(inputValue, 8));
			radix2.val(decimal_to_binary_octal(inputValue, 2));
			break;
		case 16:
			radix10.val(hexToDecimal(inputValue));
			radix8.val(hexToOctal(inputValue));
			radix2.val(hexToBinary(inputValue));
			break;
	}
}
//for Decimal
function decimal_to_binary_octal(decValue, radix) {
	var outputValue = '';
	do {
		outputValue = decValue % radix + outputValue;
		decValue = Math.floor(decValue / radix);
	}
	while (decValue > 0);
	outputValue = outputValue.replace(/^0+/, '');
	return outputValue;
}
function decimalToHex(decValue) {
	var hex = '',
        remainder;
	while (decValue > 0) {
		remainder = decValue % 16;
		hex = '0123456789ABCFEF'.substr(remainder, 1) + hex;
		decValue = parseInt(decValue / 16);
	}
	return hex;
}
// for Binery
function binaryToDecimal(binValue) {
	var decimal = 0,
        binLen = binValue.length - 1;
	for (var index = binLen; index >= 0; index--) {
		decimal += parseInt(binValue[index] * Math.pow(2, binLen - index))
	}
	var noZero = decimal.toString();
	decimal = noZero.replace(/^0+/, '');
	return decimal;
}
function binaryToOctal(binValue) {
	var octalValue = '',
		str = binValue.toString(),
		len = str.length;
	while (str.length % 3 != 0) {
		str = '0' + str;
	}
	for (var j = 0, max = len; j < max; j += 3) {
		octalValue += OctalBinaryArray.indexOf(str.substr(j, 3));
	}
	return octalValue;
}
function binaryToHex(binValue) {
	var hexValue = '',
        str = binValue.toString();
	while (str.length % 4 != 0) {
		str = '0' + str;
	}

	for (var i = 0; i < str.length; i += 4) {
		hexValue = HexValues[HexBinaryArray.indexOf(str.substr(i, 4))]
	}
	return hexValue;
}
// for Octal
function octToDecimal(octValue) {
	var decimal = 0;
	for (var i = octValue.length - 1; i >= 0; i--) {
		decimal += parseInt(octValue[i]) * Math.pow(8, octValue.length - 1 - i);
	}
	var noZero = decimal.toString();
	decimal = noZero.replace(/^0+/, '');
	return decimal;
}
function octToBinary(octValue) {
	var str = octValue.toString(),
        binaryValue = '';
	for (var j = 0; j < str.length; j++) {
		binaryValue += OctalBinaryArray[OctalValues.indexOf(str.substr(j, 1))];
	}
	binaryValue = binaryValue.replace(/^0+/, '');
	return binaryValue;
}
function octToHex(octValue) {
	//oct-bin
	var str = octValue.toString(),
        binaryValue = '';
	for (var j = 0; j < str.length; j++) {
		binaryValue += OctalBinaryArray[OctalValues.indexOf(str.substr(j, 1))];
	}
	//////////////2->16
	var hexValue = '',
        str = binaryValue.toString();
	while (str.length % 4 != 0) {
		str = '0' + str;
	}
	for (var i = 0; i < str.length; i += 4) {
		hexValue += HexValues[HexBinaryArray.indexOf(str.substr(i, 4))]
	}
	hexValue = hexValue.replace(/^0+/, '');

	return hexValue;
}
// for Hex
function hexToDecimal(hexValue) {
	///hex to bin
	var binaryValue = '',
        str = hexValue.toString(),
        str = str.toUpperCase();
	for (var j = 0; j < str.length; j++) {
		binaryValue += HexBinaryArray[HexValues.indexOf(str.substr(j, 1))]
	}
	//////// bin to dec
	var decimal = 0,
        binLen = binaryValue.length - 1;
	for (var index = binLen; index >= 0; index--) {
		decimal += parseInt(binaryValue[index] * Math.pow(2, binLen - index))
	}
	var noZero = decimal.toString();
	decimal = noZero.replace(/^0+/, '');
	return decimal
}
function hexToBinary(hexValue) {
	var binaryValue = '',
        str = hexValue.toString(),
        str = str.toUpperCase();
	for (var j = 0; j < str.length; j++) {
		binaryValue += HexBinaryArray[HexValues.indexOf(str.substr(j, 1))]
	}
	binaryValue = binaryValue.replace(/^0+/, '');
	return binaryValue;
}
function hexToOctal(hexValue) {
	//hex to bin  
	var binaryValue = hexToBinary(hexValue);
	// bin to Octal		
	return binaryToOctal(binaryValue);
	function hexToDec(hexValue) {
		return +('0x' + hexValue);//``
	}
}};