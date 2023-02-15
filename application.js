var AddUpSubtotal = function (ele) {
    var quantity = parseFloat($(ele).find('.quantity input').val());
    var price = parseFloat(Math.round($(ele).children('.price').text() * 100) / 100).toFixed(2);
    var subtotal = quantity * price;
    if (subtotal >= 0) {
        $(ele).children('.subtotal').html('$${parseFloat(Math.round(subtotal * 100) / 100).toFixed(2)}');
    } return subtotal;
};

var sum = function (acc, x) {
    return acc + x;
};


var updateShoppingCart = function(ele) {
    var allSubtotals = [];

    $('tbody tr').each(function (i, ele) {
        var subtotal = AddUpSubtotal(ele);
        allSubtotals.push(subtotal || 0);
    });

    if (allSubtotals.length == 0) {
        $('#finalTotal').html.('$--.--');
    } else {
        var cartTotal = allSubtotals.reduce(sum);
        $('#finalTotal').html('$${parseFloat(Math.round(cartTotal * 100) / 100).toFixed(2)}');
      };
    };

    
    $(document).ready(function () {
        updateShoppingCart();

        $('body').on('click', '.remove', function (event) {
            $(this).closest('tr').remove();
            updateShoppingCart();
        })

        var timeout;
            $('body').on('input', 'tr input', function () {
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                    updateShoppingCart();
                }, 500);
            });

        $('#addItem').on('submit', function (event) {
            event.preventDefault();
            var item = $(this).children('.item name').val();
            var price = $(this).children('.price').val();

            $('tbody').append('<tr><td class="item name"> ${item} </td> <td class="price">$${price}</td> <td class = "quantity"> <input type="number" value="1"/></td> <td><button class="btn btn-light btn-sm remove">remove</button></td>'
            ,'<td class="subtotal"></td> </tr>');           
            
            updateShoppingCart();
            $(this).children('.item name').val('');
            $(this).children('.price').val('');
        });
    });  