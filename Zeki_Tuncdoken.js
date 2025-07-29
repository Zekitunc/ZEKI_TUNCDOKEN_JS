  (() => {
    const self = {
      init: () => {
        self.buildCSS();
        self.buildHTML();
        self.setEvents();
      },


      //favorilerin ekleme ve kaldırmaları
      setEvents: () => {
        document.addEventListener('click', function (e) {
          if (e.target.classList.contains('fav-btn')) {
            const id = e.target.dataset.id;
            const favs = self.getFavs();

            if (favs.includes(id)) {
              // favoriden kaldır
              self.removeFav(id);
              e.target.innerHTML = '🤍';
            } else {
              // favoriye ekle
              self.addFav(id);
              e.target.innerHTML = '🧡';
            }
          }
        });
      },

      //componentler çekilirken favori olan alınsın diye get isteği

      getFavs: () => {
        try {
          return JSON.parse(localStorage.getItem('favs')) || [];
        } catch {
          return [];
        }
      },
      //yeni favori ekleme

      addFav: (id) => {
        const favs = self.getFavs();
        if (!favs.includes(id)) {
          favs.push(id);
          localStorage.setItem('favs', JSON.stringify(favs));
        }
      },
      //favori çıkarma
      removeFav: (id) => {
        let favs = self.getFavs();
        favs = favs.filter(favId => favId !== id);
        localStorage.setItem('favs', JSON.stringify(favs));
      },

      buildCSS: () => {
        const style = `
        .carousel-container {
          position: relative;
          margin-top:2%;
          padding-left:6%;
          padding-right:6%;
          padding-bottom:20%;
        }
        .carousel-wrapper {
          display: flex;
          overflow-x: auto;
          gap: 20px;
          padding: 20px;
          scroll-behavior: smooth;
          border : 1px solid gray;
          border-bottom-left-radius: 49px;
          border-bottom-right-radius: 49px;
        }
        .carousel-wrapper::-webkit-scrollbar {
          display: none;
        }
        .carousel-nav {
          position: absolute;
          top: 35%;
          transform: translateY(-50%);
          z-index: 2;
          background-color: rgba(175, 115, 5, 0.2);
          border: black;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          font-size: 20px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
          color:orange;
        }
        .carousel-nav.left {
          left: 10px;
        }
        .carousel-nav.left:hover,
        .carousel-nav.right:hover {
          border: 2px solid orange;
        }
        .carousel-nav.right {
          right: 10px;
        }
        .product-card {
          position: relative;
          width: 255px;
          height: 54vh;
          border: 8px solid white;
          border-radius: 12px;
          padding: 10px;
          background: #fff;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .product-card img {
          width: 100%;
          border-radius: 8px;
          cursor: pointer;
        }
        .product-title {
          font-size: 15px;
          font-weight: 600;
          margin-top: 10px;
          height:3vh;
        }
        .product-brand {
          font-size: 13px;
          color: #666;
          margin-bottom: 4px;
        }
        .rating {
          color: #f5a623;
          font-size: 14px;
          height:auto;
          padding-top:2vh;
        }
        .product-price {
          margin-top: 2vh;
          font-weight: bold;
          font-size: 25px;
          color: gray;
          display:flex;
          flex-direction: column-reverse;
        }
        .product-old-price {
          text-decoration: line-through;
          color: #999;
          font-size: 13px;
        }
        .discount-logo {
          max-width:40px;
          height:30px;
          object-fit: contain;
        }
        .badge {
          position: absolute;
          border-radius: 4px;
          height: 13%;
          max-width:40%;
          right: 60%;
          object-fit: contain;
        }
        .badge2 {
          position: absolute;
          right: 60%;
          max-width:40%;
          top:30px;
          border-radius: 4px;
          margin-top: 20%;
          height: 13%;
          width:10px;
          object-fit: contain;
        }
        .oldpriceAll {
          display:flex;
        }
        .product-discount {
          margin-left:1vh;
          font-size:20px;
          color:green;
          margin-bottom:1vh;
        }
        .fav-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          border: none;
          background: none;
          font-size: 20px;
          cursor: pointer;
        }
        .fav-btn.faved {
          color: red;
        }
        .add-to-cart {
          margin-top: 25%;
          width: 100%;
          color:orange;
          border: 2px solid white;
          padding: 12px;
          font-size:17px;
          border-radius: 30px;
          font-weight: bold;
          cursor: pointer;
        }
        .add-to-cart:hover {
          color:white;
          background-color:orange;
        }
        .carousel-title {
          background-color: rgba(248, 180, 53, 0.04);
          border: 1px solid gray;
          border-top-left-radius:40px;
          border-top-right-radius:40px;
          padding-bottom:2%;
          padding-top:2%;
          padding-left:2%;
          text-align:left;
          color:orange;
          margin:0;
          font-family: 'Inter', sans-serif;
        }
        .product-card:hover {
          border:4px solid orange;
        }
        `;
        const el = document.createElement('style');
        el.innerHTML = style;
        document.head.appendChild(el);
      },

      buildHTML: () => {

        //4 ana parçadan oluşacak 
        const detailDiv = document.createElement('div');
        detailDiv.className = 'product-detail';
        document.body.appendChild(detailDiv);

        const container = document.createElement('div');
        container.className = 'carousel-container';

        const title = document.createElement('h1');
        title.className = 'carousel-title';

        const wrapper = document.createElement('div');
        wrapper.className = 'carousel-wrapper';

        const render = (data) => {

          //data ve favori bilgileri çekildi
          const favs = self.getFavs();

          data.forEach((product) => {
            const card = document.createElement('div');
            card.className = 'product-card';

            const fav = document.createElement('button');
            fav.className = 'fav-btn';
            fav.innerHTML = favs.includes(product.id.toString()) ? '🧡' : '🤍';
            fav.dataset.id = product.id;

            //ürün resimleri yerleştirildikten sonra çok satan vb. etiketler eklendi. veride bulunmadığı için ikiside default ekli gözükecektir
            const badge = document.createElement('img');
            badge.className = 'badge';
            badge.src = "https://www.e-bebek.com/assets/images/cok-satan.png";
            card.appendChild(badge);

            const badge2 = document.createElement('img');
            badge2.className = 'badge2';
            badge2.src = "https://www.e-bebek.com/assets/images/yildiz-urun.png";
            card.appendChild(badge2);

            //ürüne ait olan veriler bir card elementi içinde parça parça ekleniyor
            const img = document.createElement('img');
            img.src = product.img;
            img.alt = product.name;
            img.onclick = () => window.open(product.url, '_blank');

            const title = document.createElement('div');
            title.className = 'product-title';
            title.textContent = product.brand + " - " + product.name;

            const rating = document.createElement('div');
            rating.className = 'rating';
            rating.textContent = '★'.repeat(4) + ` 300`;

            const price = document.createElement('div');
            price.className = 'product-price';
            price.textContent = product.price.toFixed(2) + ' TL';

            //indirimin olduğu ürünlere ekstradan bilgi girmemiz gerekmekte indirim oranı ve indirimsiz fiyatı gibi
            if (product.original_price > product.price) {
              const oldpriceDiv = document.createElement('div');
              oldpriceDiv.className = 'oldpriceAll';

              const oldprice = document.createElement('div');
              oldprice.className = 'product-old-price';
              oldprice.textContent = product.original_price.toFixed(2) + ' TL';

              const discount = document.createElement('div');
              discount.className = 'product-discount';
              discount.textContent = ' %' + Math.floor(((product.original_price - product.price) / product.original_price) * 100);

              const discountLogo = document.createElement('img');
              discountLogo.className = 'discount-logo';
              discountLogo.src = 'https://cdn2.iconfinder.com/data/icons/e-business-helper/240/627222-sale2-512.png';

              oldpriceDiv.appendChild(oldprice);
              oldpriceDiv.appendChild(discount);
              oldpriceDiv.appendChild(discountLogo);
              price.appendChild(oldpriceDiv);
            }

            //sepete ekle butonu eklendi fakat işlevsel değildir

            const button = document.createElement('button');
            button.className = 'add-to-cart';
            button.textContent = 'Sepete Ekle';

            card.appendChild(fav);
            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(rating);
            card.appendChild(price);
            card.appendChild(button);
            wrapper.appendChild(card);
          });

          const leftBtn = document.createElement('button');
          leftBtn.className = 'carousel-nav left';
          leftBtn.innerHTML = '<';
          leftBtn.onclick = () => {
            wrapper.scrollBy({ left: -315, behavior: 'smooth' });
          };

          const rightBtn = document.createElement('button');
          rightBtn.className = 'carousel-nav right';
          rightBtn.innerHTML = '>';
          rightBtn.onclick = () => {
            wrapper.scrollBy({ left: 315, behavior: 'smooth' });
          };

          title.textContent = "Beğenebileceğinizi düşündüklerimiz";

          container.appendChild(title);
          container.appendChild(wrapper);
          container.appendChild(leftBtn);
          container.appendChild(rightBtn);
          document.querySelector('.product-detail').appendChild(container);
        };

        const cachedData = localStorage.getItem("cachedProducts");

        if (cachedData) {
          try {
            console.log("bellekten data kullanıldı")
            const parsedData = JSON.parse(cachedData);
            render(parsedData);
          } catch (e) {
            localStorage.removeItem("cachedProducts");
            location.reload();
          }
        } else {
          console.log("veri ilk kez çekiliyor")
          fetch('https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json')
            .then(response => {
              if (!response.ok) {
                throw new Error('Veri alınamadı');
              }
              return response.json();
            })
            .then(data => {
              localStorage.setItem("cachedProducts", JSON.stringify(data));
              render(data);
            })
            .catch(error => {
              console.error('Hata oluştu:', error);
            });
        }
      },
    };

    self.init();
  })();
