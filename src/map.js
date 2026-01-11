//初始化地图，中心设置为上海
var map = L.map('map').setView([31.2304, 121.4737], 12);

//添加底图图层 (这里使用 OpenStreetMap，实际项目中可用 Mapbox 替换)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

//模拟后端提供的 JSON 数据
const artistData = [
    {
        "id": 1,
        "name": "甲",
        "location": "测试地址一",
        "lat": 31.245,
        "lng": 121.480,
        "desc": "测试信息一。"
    },
    {
        "id": 2,
        "name": "乙",
        "location": "测试地址二",
        "lat": 31.215,
        "lng": 121.465,
        "desc": "测试信息二。"
    },
    {
        "id": 3,
        "name": "丙",
        "location": "测试地址三",
        "lat": 31.222,
        "lng": 121.475,
        "desc": "测试信息三。"
    }
];

//存储标记的数组，用于后续搜索筛选
let markers = [];

//将数据渲染到地图上
function renderMap(data) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ""; //清空列表

    data.forEach(artist => {
        //添加地图标记
        var marker = L.marker([artist.lat, artist.lng]).addTo(map);

        //绑定弹窗信息
        marker.bindPopup(`<b>${artist.name}</b><br>${artist.location}<br><br><i>${artist.desc}</i>`);

        markers.push({ ...artist, markerInstance: marker });

        //更新侧边栏列表
        let item = document.createElement('div');
        item.style.padding = "0.5rem 0";
        item.style.borderBottom = "0.1rem solid #eee";
        item.style.cursor = "pointer";
        item.innerText = `${artist.name} - ${artist.location}`;

        //点击列表跳转到地图位置
        item.onclick = function() {
            map.flyTo([artist.lat, artist.lng], 15);
            marker.openPopup();
        };
        resultsDiv.appendChild(item);
    });
}

//简单的搜索过滤功能
function filterArtists() {
    let input = document.getElementById('searchInput').value.toLowerCase();

    //清除当前地图上的所有标记
    markers.forEach(m => map.removeLayer(m.markerInstance));

    //筛选数据
    let filtered = markers.filter(m =>
        m.name.includes(input) || m.location.includes(input)
    );

    //重新添加筛选后的标记
    filtered.forEach(m => map.addLayer(m.markerInstance));
}

//初始化渲染
renderMap(artistData);

console.log("地图已加载");

function resetHtmlFontSize(){
    document.documentElement.style.fontSize = screen.width/100 + 'px';
}

resetHtmlFontSize();

window.onresize = resetHtmlFontSize;