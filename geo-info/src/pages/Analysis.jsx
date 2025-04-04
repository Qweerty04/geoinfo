import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaTelegramPlane, FaInstagram, FaYoutube } from "react-icons/fa";
import { FaBars, FaTimes } from "react-icons/fa"; // добавление иконок для гамбургер-меню

const AnalysisPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisMethod, setAnalysisMethod] = useState("");
  const [analysisResult, setAnalysisResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const uploadedFile = JSON.parse(localStorage.getItem("uploadedFile"));
    if (uploadedFile) {
      setSelectedImage(uploadedFile.url);
    }
  }, []);

  // Эмуляция асинхронного запроса для анализа
  const fakeApiAnalyze = (image, method) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          image,
          vegetationPercentage: 75, // Пример результата анализа
          classification: "Густая растительность", // Пример результата классификации
        });
      }, 2000);
    });
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !analysisMethod) {
      alert("Пожалуйста, выберите снимок и метод анализа.");
      return;
    }

    setLoading(true);
    try {
      const result = await fakeApiAnalyze(selectedImage, analysisMethod);
      setAnalysisResult(result);
    } catch (error) {
      alert("Ошибка анализа!");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadResult = () => {
    const resultData = JSON.stringify(analysisResult);
    const blob = new Blob([resultData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "analysis-result.json";
    link.click();
  };

  const goHome = () => {
    navigate("/"); // Переход на главную страницу
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Навигация */}
      <header className="absolute w-full bg-white flex justify-between items-center p-5 z-50">
        <h1 className="text-3xl font-bold text-[#052c46]">ГеоИнфо</h1>

        {/* Десктопное меню */}
        <nav className="hidden md:flex space-x-8">
        <a href="/" className="text-black text-2xl font-medium hover:text-blue-700">Главная</a>
          <a href="/map" className="text-black text-2xl font-medium hover:text-blue-700">Карта</a>
          <a href="/upload" className="text-black text-2xl font-medium hover:text-blue-700">Загрузка</a>
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
          <a href="/map" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Карта</a>
          <a href="/upload" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Загрузка</a>
          <a href="/library" className="text-white text-3xl" onClick={() => setMenuOpen(false)}>Учебные материалы</a>
        </div>
      )}

      {/* Основной контент страницы анализа */}
      <div className="w-full pt-20 py-12 bg-gray-100"> {/* pt-20 добавлен, чтобы компенсировать высоту header */}
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center">Анализ спутникового снимка</h2>
          <p className="mt-5 text-lg text-center">
            Выберите метод анализа для получения результатов.
          </p>

          {/* Отображение изображения */}
          {selectedImage && (
            <div className="mt-6 flex justify-center">
              <img
                src={selectedImage}
                alt="Selected Image"
                className="max-w-full max-h-80 object-contain"
              />
            </div>
          )}

          {/* Выбор метода анализа */}
          <div className="mt-6 flex justify-center space-x-4">
            <select
              className="p-3 border-2 rounded-md"
              onChange={(e) => setAnalysisMethod(e.target.value)}
            >
              <option value="">Выберите метод анализа</option>
              <option value="NDVI">NDVI (вегетационный индекс)</option>
              <option value="classification">Классификация объектов</option>
              <option value="landscapeChange">Изменение ландшафта</option>
            </select>
          </div>

          {/* Кнопка для начала анализа */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={handleAnalyze}
              className="bg-blue-600 text-white text-xl py-3 px-8 rounded hover:bg-blue-700"
            >
              Анализировать
            </button>
          </div>

          {/* Отображение результатов анализа */}
          {loading && (
            <div className="mt-6 flex justify-center">
              <div className="w-12 h-12 border-4 border-t-4 border-blue-600 rounded-full animate-spin"></div>
            </div>
          )}

          {analysisResult && !loading && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold text-center">Результаты анализа</h3>

              {/* Визуальный результат */}
              <div className="mt-4 flex justify-center">
                <img
                  src={analysisResult.image}
                  alt="Analyzed Image"
                  className="max-w-full max-h-80 object-contain"
                />
              </div>

              {/* Числовые параметры */}
              <div className="mt-4 text-center">
                <p className="text-lg">Растительность по NDVI: {analysisResult.vegetationPercentage}%</p>
                <p className="text-lg">Классификация: {analysisResult.classification}</p>
              </div>

              {/* Кнопка для скачивания результата */}
              <div className="mt-6 flex justify-center">
                <button
                  className="bg-green-600 text-white text-xl py-3 px-8 rounded hover:bg-green-700"
                  onClick={handleDownloadResult}
                >
                  Скачать результат
                </button>
              </div>
            </div>
          )}
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
              <a href="#" className="text-black hover:underline">
                Политика конфиденциальности
              </a>
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

          <div className="text-black text-center mt-6">
            © 2025 ГеоИнфо. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AnalysisPage;
