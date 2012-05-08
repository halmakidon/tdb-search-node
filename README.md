tdb-search-node
===============

帝国データバンクを検索し、結果をJSON形式で返却するアプリケーション

Input
--------------
http://localhost:3000/tdb/search?key=${KEY}&page=${PAGE}

${KEY} : ShiftJISをURLエンコードした検索キー(社名検索)
${PAGE} : 取得するページ

Output
--------------
返却JSONの例（一部省略)

`{
    "searchHit":"112",
    "maxPage":"6",
    "currentPage":"6",
    "list":[
        {
            "code":"984672640",
            "name":"株式会社帝国ホテルエンタープライズ",
            "address":"東京都千代田区内幸町１",
            "type":"他の事業サービス"
        },
        {
            "code":"985444157",
            "name":"株式会社帝国ホテルサービス",
            "address":"東京都千代田区内幸町１",
            "type":"労働者派遣業"
        }...
    ],
    "success":true
}`
