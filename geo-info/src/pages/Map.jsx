import React, { useState } from "react";
import { FaBars, FaTimes, FaLayerGroup } from "react-icons/fa";
import { MapContainer, TileLayer, LayersControl, LayerGroup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";

const MapPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <header className="absolute w-full bg-white flex justify-around items-center p-5 z-50">
        <h1 className="text-3xl font-bold text-[#052c46]">ГеоИнфо</h1>

        {/* Десктопное меню */}
        <nav className="hidden md:flex space-x-8">
          <a href="/" className="text-black text-2xl font-medium hover:text-blue-700">Главная</a>
          <a href="/upload" className="text-black text-2xl font-medium hover:text-blue-700">Загрузка</a>
          <a href="/analysis" className="text-black text-2xl font-medium hover:text-blue-700">Анализ</a>
          <a href="/library" className="text-black text-2xl font-medium hover:text-blue-700">Учебные материалы</a>
        </nav>

        {/* Гамбургер-меню */}
        <div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl text-black">
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </header>

      {/* Мобильное меню */}
      {menuOpen && (
        <div className="absolute top-0 left-0 w-full h-screen bg-black bg-opacity-80 flex flex-col items-center justify-center space-y-6 md:hidden z-40">
          <a href="/" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Главная</a>
          <a href="/upload" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Загрузка</a>
          <a href="/analysis" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Анализ</a>
          <a href="/library" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Учебные материалы</a>
        </div>
      )}

      {/* Карта */}
      <div className="relative w-full h-screen">
      {/* Контейнер карты */}
      <div className="absolute top-[70px] w-full h-[calc(100vh-70px)] z-0">
        <MapContainer
          center={[48.0196, 66.9237]} // Центр карты (Казахстан)
          zoom={5}
          className="w-full h-full"
          scrollWheelZoom={false} // Отключаем прокрутку колесиком
        >
          <LayersControl position="topright">
            {/* Базовые слои */}
            <LayersControl.BaseLayer checked name="OpenStreetMap">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="Google Maps Satellite">
              <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
            </LayersControl.BaseLayer>

            {/* Дополнительные слои */}
            <LayersControl.Overlay name="NDVI">
              <LayerGroup>
                <TileLayer url="https://www.fused.io/server/v1/realtime-shared/{instance_id}/run/tiles/{z}/{x}/{y}?dtype_out_raster=png" />
              </LayerGroup>
            </LayersControl.Overlay>

            <LayersControl.Overlay name="Тепловая карта">
              <LayerGroup>
                <TileLayer url="https://some-heatmap-url/{z}/{x}/{y}.png" />
              </LayerGroup>
            </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>

        {/* Панель управления слоями */}
        <div className="absolute top-20 left-4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="text-lg font-bold flex items-center"><FaLayerGroup className="mr-2" /> Слои</h3>
          <label className="block mt-2">
            <input type="checkbox" className="mr-2" /> NDVI
          </label>
          <label className="block mt-2">
            <input type="checkbox" className="mr-2" /> Тепловая карта
          </label>
          <label className="block mt-2">
            <input type="file" className="mt-2" /> Загрузить GeoJSON
          </label>
        </div>
      </div>

      {/* Футер */}
      <footer className="w-full bg-white text-black py-10">
        <div className="w-full max-w-screen-2xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-xl font-bold">О проекте</h3>
              <p className="text-black mt-2">
                ГеоИнфо — сервис для анализа спутниковых снимков и геопространственных данных.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Контакты</h3>
              <p className="text-black">example@example.com</p>
              <p className="text-black">+7 (123) 455-75-80</p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Документы</h3>
              <a href="#" className="text-black hover:underline">Политика конфиденциальности</a>
            </div>
            <div>
              <h3 className="text-xl font-bold">Мы в соцсетях</h3>
              <div className="flex space-x-4 mt-2">
          <a
            href="https://t.me/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-blue-500 text-2xl"
            aria-label="Telegram"
          >
            <FaTelegramPlane />
          </a>
          <a
            href="https://instagram.com/yourprofile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-pink-500 text-2xl"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://youtube.com/yourchannel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black hover:text-red-600 text-2xl"
            aria-label="YouTube"
          >
            <FaYoutube />
          </a>
        </div>
            </div>
          </div>
          <hr className="mt-8" />
          <div className="text-black text-center mt-6">© 2025 ГеоИнфо. Все права защищены.</div>
        </div>
      </footer>
    </div>
  );
};

export default MapPage;
