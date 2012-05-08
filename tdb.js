var sqraper = require('sqraper'),
    Iconv = require('iconv').Iconv;
require('buffertools');


exports.search = function(req, res){

  var keyword = req.query.keyword;
  var page = req.query.page;
  
  if (!keyword || !page) {
    res.send([]);
    return;
  }
  /*
   * var iconv = new Iconv('UTF-8//TRANSLIT//IGNORE', 'Shift_JIS');
   * var buffer = iconv.convert(query);
   * var requestURI = 'http://www.tdb.co.jp/service/u/1005.jsp' + '?page_count=' + page + '&companyName=' + encodeURI(buffer) + '&companyNameAccord=1&address_sikugun=&freeWord=';
   */
  var requestURI = 'http://www.tdb.co.jp/service/u/1005.jsp' + '?page_count=' + page + '&companyName=' + keyword + '&companyNameAccord=1&address_sikugun=&freeWord=';
  console.log('requestURI:' + requestURI);

  sqraper(requestURI, function(err, $) {
    if (err) {
      res.send(500);
    }

    var rows = $('.searchResult tr:gt(0)');
    
    var resultList = [];
    var json = {};

    rows.each(function() {
      var result = {};

      result.code = $(this).find('td:eq(0)').text();
      result.name = $(this).find('p.company').text();
      result.address = $(this).find('p.companyPlace').text();
      result.type = $(this).find('td:eq(2)').text();

      resultList.push(result);
    });
        
    var hitArea = $('.searchHit');
    
    json.searchHit = hitArea.find('div.left > span').text();
   
    var pageText = hitArea.find('div.center').text();
    var sliceIndex = pageText.indexOf('ページ中');
    json.maxPage = pageText.substring(sliceIndex-1, sliceIndex);

    json.currentPage = hitArea.find('div.center select option:selected').val();

    json.list = resultList;
    json.success = true;

    res.send(json);
    return;
  });
};

console.log('load tdb module');
