// HELPER FUNCTION

const $ = (elem) => {
    return document.querySelector(elem);
};

window.addEventListener('load', (e) => {

    let addressType = $('#addressType');
    addressType.addEventListener('change', (e) => {
        if (addressType.value === 'Other') {
            $('#otherAddress1').classList.remove('hidden');
            $('#otherAddress2').classList.remove('hidden');
        } else {
            $('#otherAddress1').classList.add('hidden');
            $('#otherAddress2').classList.add('hidden');
        }
    });







});