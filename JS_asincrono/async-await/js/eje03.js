const baseUrl = 'https://picsum.photos/v2/';
const app = {
    getPictures : async function (){
        const resp = await fetch(`${baseUrl}list`);
        const data = await resp.json();
        if (resp.ok && resp.status == 200) 
            this.renderPictures(data);
        
    },
    renderPictures : function (data){
        const content = document.querySelector(".content");

        data.map(item =>{
            content.innerHTML += `
            <div class="image-card">
                <img width="100px" height="100px" src="${item.download_url}" alt="">

                <div class="img-section">
                    <h2>autor</h2>
                    <span>${item.author}</span>
                </div>

                <div class="img-section">
                    <h2>url</h2>
                    <span>
                        <a href="${item.url}Y" target="_blank" >abrir</a>
                    </span>
                </div>

            </div>
            `;
        })
    },
    saludar : () => { alert("hola")}
};

(async function () {
    try {
        await app.getPictures();
    } catch (error) {
       console.error(`mi error> ${error}`); 
    }
})()