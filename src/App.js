import React, { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);
  const [activeCat] = useState('Semua');
  const [selectedItem, setSelectedItem] = useState(null);

  const [cart, setCart] = useState([]);
  const [checkoutData, setCheckoutData] = useState({ address: '', city: '', province: '', zip: '', courier: 'JNE', paymentMethod: 'BCA Virtual Account' });
  const [chatMessages, setChatMessages] = useState([
    { id: 1, text: "Halo, barang ini masih ada?", sender: "me", time: "10:00" },
    { id: 2, text: "Masih kak, silakan diorder.", sender: "them", time: "10:05" }
  ]);
  const [newChatMessage, setNewChatMessage] = useState("");
  const [items, setItems] = useState([
    { id: 1, name: "Fujifilm X-T20", price: "7.500.000", cat: "Elektronik", condition: "Bekas", loc: "Malang", img: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600", owner: "admin" },
    { id: 2, name: "Mechanical Keyboard", price: "450.000", cat: "Elektronik", condition: "Baru", loc: "Surabaya", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600", owner: "enno" },
    { id: 3, name: "Buku Rekayasa Kebutuhan", price: "85.000", cat: "Pendidikan", condition: "Bekas", loc: "Malang", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600", owner: "enno" },
    { id: 4, name: "Jaket Denim Vintage", price: "150.000", cat: "Fashion", condition: "Bekas", loc: "Jakarta", img: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=600", owner: "admin" },
    { id: 5, name: "Monitor Dell 24 inch", price: "1.200.000", cat: "Elektronik", condition: "Bekas", loc: "Bandung", img: "https://images.unsplash.com/photo-1527443195645-1133f7f28990?w=600", owner: "user1" },
    { id: 6, name: "Sepatu Puma", price: "550.000", cat: "Fashion", condition: "Baru", loc: "Malang", img: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600", owner: "user2" },
    { id: 7, name: "Buku Clean Code", price: "120.000", cat: "Pendidikan", condition: "Bekas", loc: "Yogyakarta", img: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600", owner: "admin" },
    { id: 8, name: "Kamera Analog Canon", price: "850.000", cat: "Elektronik", condition: "Bekas", loc: "Semarang", img: "https://images.unsplash.com/photo-1516961642265-531546e84af2?w=600", owner: "user1" },
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const role = email.includes('admin') ? 'admin' : 'user';
    setUser({ name: email.split('@')[0], role });
    setPage('home');
  };

  const addToCart = (item) => {
    if (!cart.find(i => i.id === item.id)) {
      setCart([...cart, item]);
      alert("Barang ditambahkan ke keranjang!");
    } else {
      alert("Barang sudah ada di keranjang!");
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i.id !== id));
  };

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    setPage('payment');
  };

  const handlePaymentConfirm = () => {
    const purchasedIds = cart.map(i => i.id);
    setItems(items.filter(i => !purchasedIds.includes(i.id)));
    setCart([]);
    alert("Pembayaran berhasil! Terima kasih atas pesanan Anda.");
    setPage('home');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: newChatMessage,
      sender: "me",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, newMessage]);
    setNewChatMessage("");

    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: "Baik kak, sebentar saya cek ya.",
        sender: "them",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Registrasi berhasil! Silakan masuk dengan akun Anda.");
    setPage('login');
  };

  const deleteItem = (id) => {
    if (window.confirm("Hapus barang ini?")) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  if (page === 'login') return (
    <div className="min-h-screen bg-[#fdf9f1] flex">
      <div className="hidden lg:flex flex-1 bg-blue-600 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tighter mb-6">MyOldStuff</h1>
          <p className="text-blue-100 text-xl max-w-md leading-relaxed">Platform terbaik untuk menemukan harta karun preloved dengan harga bersahabat dan pengalaman yang menyenangkan.</p>
        </div>
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 max-w-sm shadow-2xl">
            <p className="font-medium text-lg italic">"Dulu bingung mau jual barang kemana, sejak pakai MyOldStuff jadi lebih gampang dan cepat laku!"</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">A</div>
              <div>
                <p className="text-sm font-bold text-white">Arga Satria</p>
                <p className="text-xs text-blue-200">Pengguna Setia</p>
              </div>
            </div>
          </div>
        </div>
        {/* Dekorasi Background */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] opacity-40"></div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-black tracking-tight text-[#0f1b29] mb-3">Selamat Datang 👋</h2>
            <p className="text-[#64748b] font-medium text-lg">Masuk ke akun Anda untuk melanjutkan</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#0f1b29] mb-3">Alamat Email</label>
              <input name="email" type="email" placeholder="contoh@email.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0f1b29] mb-3">Kata Sandi</label>
              <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition shadow-sm" required />
            </div>
            <button className="w-full py-4 mt-8 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 active:scale-95">Masuk Sekarang</button>
          </form>
          <p className="mt-8 text-center text-[#64748b] font-medium">
            Belum punya akun? <button onClick={() => setPage('register')} className="text-blue-600 font-bold hover:text-blue-800 transition">Daftar di sini</button>
          </p>
        </div>
      </div>
    </div>
  );

  if (page === 'register') return (
    <div className="min-h-screen bg-[#fdf9f1] flex">
      <div className="hidden lg:flex flex-1 bg-blue-600 p-12 text-white flex-col justify-between relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-5xl font-black tracking-tighter mb-6">MyOldStuff</h1>
          <p className="text-blue-100 text-xl max-w-md leading-relaxed">Mulai perjalanan belanjamu sekarang. Daftar gratis dan temukan jutaan barang menarik.</p>
        </div>
        <div className="relative z-10">
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 max-w-sm shadow-2xl">
            <p className="font-medium text-lg italic">"Platform andalan buat hunting barang antik dan preloved branded!"</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">B</div>
              <div>
                <p className="text-sm font-bold text-white">Budi Santoso</p>
                <p className="text-xs text-blue-200">Kolektor</p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[100px] opacity-60"></div>
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-400 rounded-full blur-[100px] opacity-40"></div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 lg:p-20">
        <div className="w-full max-w-md">
          <div className="text-center lg:text-left mb-10">
            <h2 className="text-4xl font-black tracking-tight text-[#0f1b29] mb-3">Daftar Akun Baru ✨</h2>
            <p className="text-[#64748b] font-medium text-lg">Buat akun untuk mulai jual beli</p>
          </div>
          <form onSubmit={handleRegister} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-[#0f1b29] mb-3">Nama Lengkap</label>
              <input name="name" type="text" placeholder="John Doe" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0f1b29] mb-3">Alamat Email</label>
              <input name="email" type="email" placeholder="contoh@email.com" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition shadow-sm" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-[#0f1b29] mb-3">Kata Sandi</label>
              <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition shadow-sm" required />
            </div>
            <button className="w-full py-4 mt-8 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 active:scale-95">Daftar Sekarang</button>
          </form>
          <p className="mt-8 text-center text-[#64748b] font-medium">
            Sudah punya akun? <button onClick={() => setPage('login')} className="text-blue-600 font-bold hover:text-blue-800 transition">Masuk di sini</button>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fdf9f1] text-[#0f1b29] font-sans">
      {/* NAVBAR */}
      <nav className="bg-[#fdf9f1]/90 backdrop-blur-md border-b border-[#ece7de] sticky top-0 z-50 px-6 lg:px-20 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter cursor-pointer text-[#0f1b29]" onClick={() => setPage('home')}>MyOldStuff</h1>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-[#64748b]">
          <button onClick={() => setPage('home')} className={page === 'home' ? 'text-blue-600' : 'hover:text-[#0f1b29] transition'}>Home</button>
          <button onClick={() => setPage('chat')} className={page === 'chat' ? 'text-blue-600' : 'hover:text-[#0f1b29] transition'}>Chat</button>
          {user.role === 'admin' && <button onClick={() => setPage('admin')} className={page === 'admin' ? 'text-blue-600' : 'hover:text-[#0f1b29] transition'}>Admin Panel</button>}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative cursor-pointer" onClick={() => setPage('cart')}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#0f1b29] hover:text-blue-600 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cart.length}</span>}
          </div>
          <button onClick={() => setPage('sell')} className="bg-[#0f1b29] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-[#0f1b29]/20 hover:bg-blue-600 transition active:scale-95">+ Jual</button>
          <div onClick={() => setPage('profile')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#0f1b29] border border-[#ece7de] uppercase cursor-pointer hover:ring-2 hover:ring-blue-600 transition" title="Lihat Profil">{user.name[0]}</div>
          <button onClick={() => { setUser(null); setPage('login'); }} className="text-red-500 hover:text-white font-bold text-sm bg-red-50 hover:bg-red-500 px-4 py-2 rounded-full transition">Logout</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        {page === 'profile' && (
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight mb-8 text-[#0f1b29]">Profil Pengguna</h2>
            <div className="bg-white p-10 rounded-[3rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] flex flex-col md:flex-row gap-10 items-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black text-5xl shrink-0 uppercase shadow-inner">
                {user.name[0]}
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold text-[#0f1b29] capitalize mb-2">{user.name}</h3>
                <span className="bg-blue-100 text-blue-700 text-sm font-bold px-4 py-1.5 rounded-full inline-block mb-4">
                  {user.role === 'admin' ? 'Administrator' : 'Member'}
                </span>
                <div className="grid grid-cols-2 gap-4 mt-4 bg-[#fdf9f1] p-6 rounded-3xl border border-[#ece7de]">
                  <div>
                    <p className="text-[#64748b] text-sm font-medium">Barang Dijual</p>
                    <p className="text-2xl font-black text-[#0f1b29]">{items.filter(i => i.owner === user.name).length}</p>
                  </div>
                  <div>
                    <p className="text-[#64748b] text-sm font-medium">Transaksi Sukses</p>
                    <p className="text-2xl font-black text-[#0f1b29]">12</p>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-black mt-12 mb-6 text-[#0f1b29]">Barang yang Anda Jual</h3>
            {items.filter(i => i.owner === user.name).length === 0 ? (
              <div className="bg-white p-10 rounded-[2rem] border border-[#ece7de] text-center">
                <p className="text-[#64748b] font-medium">Anda belum menjual barang apapun.</p>
                <button onClick={() => setPage('sell')} className="mt-4 text-blue-600 font-bold hover:underline">Mulai Jual Barang</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {items.filter(i => i.owner === user.name).map(item => (
                  <div key={item.id} className="bg-white p-4 rounded-3xl border border-[#ece7de] flex items-center gap-4">
                    <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" />
                    <div className="flex-1">
                      <h4 className="font-bold text-[#0f1b29]">{item.name}</h4>
                      <p className="text-blue-600 font-black">Rp {item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {page === 'home' && (
          <>
            {/* HERO SECTION */}
            <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 py-10">
              <div className="flex-1 flex flex-col items-start animate-fade-in-up">
                <span className="bg-[#e6f0ff] text-blue-700 text-xs font-bold px-4 py-2 rounded-full w-fit mb-6 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  Platform Jual Beli Barang Bekas
                </span>
                <h2 className="text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-6 text-[#0f1b29]">
                  Barang lama kamu, <br />
                  <span className="text-blue-600">harta buat yang lain.</span>
                </h2>
                <p className="text-lg text-[#64748b] mb-10 max-w-lg leading-relaxed">
                  Ruang digital untuk berburu dan menjual barang-barang preloved dengan tampilan yang menyenangkan dan mudah digunakan.
                </p>
                <div className="flex gap-4">
                  <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-blue-600/30 hover:bg-blue-700 transition active:scale-95">Mulai Belanja</button>
                  <button onClick={() => setPage('sell')} className="bg-transparent border-2 border-[#0f1b29] text-[#0f1b29] px-8 py-4 rounded-full font-bold hover:bg-[#0f1b29] hover:text-white transition active:scale-95">Jual Barang</button>
                </div>
                <div className="flex flex-wrap gap-8 md:gap-12 mt-12 pt-8 border-t border-[#ece7de] w-full">
                  <div>
                    <h4 className="text-2xl font-black text-[#0f1b29]">{items.length}+</h4>
                    <p className="text-sm text-[#64748b]">Total Produk</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-[#0f1b29]">12.5K+</h4>
                    <p className="text-sm text-[#64748b]">Pengguna Aktif</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-[#0f1b29]">8.2K+</h4>
                    <p className="text-sm text-[#64748b]">Barang Terjual</p>
                  </div>
                  <div>
                    <h4 className="text-2xl font-black text-[#0f1b29]">4.9/5</h4>
                    <p className="text-sm text-[#64748b]">Rating Kepuasan</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative flex items-center justify-center w-full min-h-[400px]">
                <div className="absolute inset-0 bg-[#f0e6d2] rounded-full blur-[100px] opacity-60"></div>

                {/* Floating Cards simulating UI */}
                <div className="relative z-10 grid gap-4">
                  <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-[#e5e0d8] border border-[#ece7de] max-w-[250px] rotate-[-2deg] animate-float">
                    <div className="w-12 h-12 bg-blue-100 rounded-full mb-4 flex items-center justify-center text-blue-600 font-bold text-xl">S</div>
                    <h3 className="font-bold text-[#0f1b29] mb-1">Status Akun</h3>
                    <p className="text-xs text-[#64748b]">Masuk sebagai <span className="font-bold">{user.role}</span></p>
                  </div>
                  <div className="bg-white p-6 rounded-[2rem] shadow-xl shadow-[#e5e0d8] border border-[#ece7de] max-w-[280px] ml-20 rotate-[2deg] animate-float-delayed">
                    <h3 className="font-bold text-[#0f1b29] mb-1">Cari Barang Mudah</h3>
                    <p className="text-xs text-[#64748b] leading-relaxed">Tampilan rapi untuk berburu barang preloved dengan santai dan aman.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FITUR KEUNGGULAN */}
            <div className="mb-24 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-white p-8 rounded-[2.5rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] hover:-translate-y-2 transition duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0f1b29] mb-3">Transaksi Aman</h3>
                <p className="text-[#64748b] leading-relaxed">Sistem pembayaran yang dijamin aman dan terpercaya untuk setiap transaksi Anda.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] hover:-translate-y-2 transition duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0f1b29] mb-3">Proses Cepat</h3>
                <p className="text-[#64748b] leading-relaxed">Cari, chat, dan bayar dalam hitungan menit tanpa prosedur yang berbelit.</p>
              </div>
              <div className="bg-white p-8 rounded-[2.5rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] hover:-translate-y-2 transition duration-300">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                </div>
                <h3 className="text-xl font-bold text-[#0f1b29] mb-3">Barang Berkualitas</h3>
                <p className="text-[#64748b] leading-relaxed">Kurasi produk preloved terbaik dari para penjual terverifikasi di seluruh Indonesia.</p>
              </div>
            </div>

            {/* GRID PRODUK */}
            <div className="flex justify-between items-end mb-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div>
                <h3 className="text-3xl font-black text-[#0f1b29] mb-2">Rekomendasi Terbaru</h3>
                <p className="text-[#64748b]">Temukan barang preloved favoritmu hari ini.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {items.filter(i => activeCat === 'Semua' || i.cat === activeCat).map(item => (
                <div key={item.id} onClick={() => { setSelectedItem(item); setPage('item_detail'); }} className="group bg-white rounded-[2.5rem] p-4 border border-[#ece7de] hover:shadow-2xl hover:shadow-[#e5e0d8] transition-all duration-500 cursor-pointer">
                  <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-[#0f1b29]">{item.condition}</div>
                  </div>
                  <div className="px-2 pb-2">
                    <h5 className="font-bold text-[#0f1b29] mb-1 group-hover:text-blue-600 transition">{item.name}</h5>
                    <p className="text-[#64748b] text-[10px] mb-4 uppercase font-bold tracking-tighter">{item.loc} • {item.cat}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black tracking-tight text-[#0f1b29]">Rp {item.price}</span>
                      {user.role === 'admin' ? (
                        <button onClick={(e) => { e.stopPropagation(); deleteItem(item.id); }} className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      ) : (
                        <button onClick={(e) => { e.stopPropagation(); addToCart(item); }} className="bg-[#fdf9f1] text-[#0f1b29] p-2.5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition shadow-sm border border-[#ece7de] group-hover:border-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'item_detail' && selectedItem && (
          <div className="max-w-5xl mx-auto">
            <button onClick={() => setPage('home')} className="mb-8 text-[#64748b] hover:text-[#0f1b29] font-bold flex items-center gap-2 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Kembali ke Beranda
            </button>
            <div className="bg-white rounded-[3rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] overflow-hidden flex flex-col md:flex-row">
              <div className="md:w-1/2 h-[400px] md:h-auto">
                <img src={selectedItem.img} alt={selectedItem.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-10 md:w-1/2 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#fdf9f1] border border-[#ece7de] text-[#0f1b29] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{selectedItem.condition}</span>
                  <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">{selectedItem.cat}</span>
                </div>
                <h2 className="text-4xl font-black text-[#0f1b29] mb-2">{selectedItem.name}</h2>
                <p className="text-[#64748b] font-medium flex items-center gap-2 mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {selectedItem.loc}
                </p>

                <div className="bg-[#fdf9f1] p-6 rounded-3xl border border-[#ece7de] mb-8">
                  <p className="text-[#64748b] text-sm mb-1">Harga Barang</p>
                  <p className="text-4xl font-black text-blue-600">Rp {selectedItem.price}</p>
                </div>

                <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#ece7de]">
                  <div className="w-12 h-12 bg-[#0f1b29] text-white rounded-full flex items-center justify-center font-bold uppercase">{selectedItem.owner[0]}</div>
                  <div>
                    <p className="text-sm text-[#64748b] mb-0.5">Dijual oleh</p>
                    <p className="font-bold text-[#0f1b29] capitalize">{selectedItem.owner}</p>
                  </div>
                  <button onClick={() => setPage('chat')} className="ml-auto bg-blue-50 text-blue-600 px-4 py-2 rounded-full font-bold text-sm hover:bg-blue-100 transition flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    Chat Penjual
                  </button>
                </div>

                <div className="flex gap-4">
                  <button onClick={() => { addToCart(selectedItem); setPage('cart'); }} className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2 active:scale-95">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    Masukkan Keranjang
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {page === 'chat' && (
          <div className="max-w-3xl mx-auto bg-white rounded-[3rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] overflow-hidden flex flex-col h-[600px]">
            <div className="bg-[#0f1b29] text-white p-6 px-8 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center font-bold text-xl">S</div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Seller</h3>
                  <p className="text-blue-300 text-xs font-medium">Online</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-8 overflow-y-auto bg-[#fdf9f1] space-y-6">
              {chatMessages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl p-4 ${msg.sender === 'me' ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-200' : 'bg-white text-[#0f1b29] rounded-bl-none border border-[#ece7de] shadow-sm'}`}>
                    <p className="text-sm font-medium">{msg.text}</p>
                    <p className={`text-[10px] mt-2 text-right ${msg.sender === 'me' ? 'text-blue-200' : 'text-[#64748b]'}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-6 bg-white border-t border-[#ece7de]">
              <form onSubmit={handleSendMessage} className="flex gap-4">
                <input
                  type="text"
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  placeholder="Ketik pesan..."
                  className="flex-1 px-6 py-4 rounded-full bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition"
                />
                <button type="submit" className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition hover:scale-105">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                </button>
              </form>
            </div>
          </div>
        )}

        {page === 'sell' && (
          <div className="max-w-xl mx-auto bg-white p-12 rounded-[3rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8]">
            <h3 className="text-3xl font-black mb-8 tracking-tighter text-[#0f1b29]">Pasang Iklan</h3>
            <form className="space-y-4">
              <input placeholder="Nama Barang" className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200" />
              <div className="grid grid-cols-2 gap-4">
                <input placeholder="Harga" className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200" />
                <select className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none font-medium text-[#64748b] focus:ring-2 focus:ring-blue-200">
                  <option>Elektronik</option><option>Fashion</option><option>Pendidikan</option>
                </select>
              </div>
              <textarea placeholder="Deskripsi Singkat" className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none h-32 focus:ring-2 focus:ring-blue-200"></textarea>
              <button type="button" onClick={() => setPage('home')} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition">Posting Barang</button>
              <button type="button" onClick={() => setPage('home')} className="w-full text-[#64748b] font-bold text-sm mt-2 hover:text-[#0f1b29] transition">Batal</button>
            </form>
          </div>
        )}

        {page === 'cart' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight mb-8 text-[#0f1b29]">Keranjang Belanja</h2>
            {cart.length === 0 ? (
              <div className="bg-white p-12 rounded-[3rem] border border-[#ece7de] text-center shadow-xl shadow-[#e5e0d8]">
                <p className="text-[#64748b] font-medium text-lg">Keranjang Anda masih kosong.</p>
                <button onClick={() => setPage('home')} className="mt-6 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 transition">Mulai Belanja</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-[2rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] flex items-center gap-6">
                      <img src={item.img} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-[#0f1b29]">{item.name}</h4>
                        <p className="text-[#64748b] text-sm">{item.loc} • {item.condition}</p>
                        <p className="text-xl font-black mt-2 text-[#0f1b29]">Rp {item.price}</p>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="bg-[#0f1b29] text-white p-8 rounded-[2.5rem] shadow-xl shadow-[#0f1b29]/30 h-fit sticky top-24">
                  <h3 className="font-bold text-xl mb-6">Ringkasan Belanja</h3>
                  <div className="flex justify-between items-center mb-4 text-blue-100">
                    <span>Total Barang</span>
                    <span>{cart.length} item</span>
                  </div>
                  <div className="flex justify-between items-center mb-8 border-t border-slate-700 pt-4">
                    <span className="font-bold">Total Harga</span>
                    <span className="text-2xl font-black">
                      Rp {cart.reduce((total, item) => total + parseInt(item.price.replace(/\./g, '')), 0).toLocaleString('id-ID')}
                    </span>
                  </div>
                  <button onClick={() => setPage('checkout')} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">Lanjut ke Checkout</button>
                </div>
              </div>
            )}
          </div>
        )}

        {page === 'checkout' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-black tracking-tight mb-8 text-[#0f1b29]">Checkout</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8]">
                <h3 className="text-xl font-bold mb-6 text-[#0f1b29]">Alamat Pengiriman</h3>
                <form id="checkoutForm" onSubmit={handleCheckoutSubmit} className="space-y-4">
                  <div className="space-y-4">
                    <input type="text" placeholder="Nama Penerima" required className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition" />
                    <input type="text" placeholder="Nomor Telepon" required className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Provinsi" required value={checkoutData.province} onChange={(e) => setCheckoutData({ ...checkoutData, province: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition" />
                    <input type="text" placeholder="Kota/Kabupaten" required value={checkoutData.city} onChange={(e) => setCheckoutData({ ...checkoutData, city: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition" />
                  </div>
                  <textarea placeholder="Alamat Lengkap (Jalan, RT/RW, Patokan)" required value={checkoutData.address} onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none h-32 focus:ring-2 focus:ring-blue-200 transition"></textarea>
                  <div className="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Kode Pos" required value={checkoutData.zip} onChange={(e) => setCheckoutData({ ...checkoutData, zip: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition" />
                    <select value={checkoutData.courier} onChange={(e) => setCheckoutData({ ...checkoutData, courier: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-[#fdf9f1] border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition font-medium text-[#64748b]">
                      <option value="JNE">JNE Reguler (Rp 20.000)</option>
                      <option value="SiCepat">SiCepat BEST (Rp 25.000)</option>
                      <option value="GoSend">GoSend Instant (Rp 35.000)</option>
                    </select>
                  </div>
                </form>
              </div>
              <div className="bg-[#0f1b29] text-white p-8 rounded-[2.5rem] shadow-xl shadow-[#0f1b29]/30 h-fit sticky top-24">
                <h3 className="font-bold text-xl mb-6">Ringkasan Tagihan</h3>
                <div className="space-y-3 text-blue-100 mb-6">
                  <div className="flex justify-between items-center">
                    <span>Subtotal Produk</span>
                    <span>Rp {cart.reduce((total, item) => total + parseInt(item.price.replace(/\./g, '')), 0).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Ongkos Kirim</span>
                    <span>Rp {checkoutData.courier === 'JNE' ? '20.000' : checkoutData.courier === 'SiCepat' ? '25.000' : '35.000'}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-8 border-t border-slate-700 pt-4">
                  <span className="font-bold">Total Tagihan</span>
                  <span className="text-2xl font-black text-green-400">
                    Rp {(cart.reduce((total, item) => total + parseInt(item.price.replace(/\./g, '')), 0) + (checkoutData.courier === 'JNE' ? 20000 : checkoutData.courier === 'SiCepat' ? 25000 : 35000)).toLocaleString('id-ID')}
                  </span>
                </div>
                <button form="checkoutForm" type="submit" className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-900/50">Pilih Pembayaran</button>
              </div>
            </div>
          </div>
        )}

        {page === 'payment' && (
          <div className="max-w-xl mx-auto bg-white p-12 rounded-[3rem] border border-[#ece7de] shadow-xl shadow-[#e5e0d8] text-center">
            <h3 className="text-3xl font-black mb-2 tracking-tighter text-[#0f1b29]">Pembayaran</h3>
            <p className="text-[#64748b] mb-8 font-medium">Selesaikan pembayaran Anda</p>

            <div className="bg-[#fdf9f1] p-6 rounded-3xl mb-8 border border-[#ece7de]">
              <p className="text-[#64748b] text-sm mb-1">Total yang harus dibayar</p>
              <h2 className="text-4xl font-black text-blue-600 mb-6">
                Rp {(cart.reduce((total, item) => total + parseInt(item.price.replace(/\./g, '')), 0) + (checkoutData.courier === 'JNE' ? 20000 : checkoutData.courier === 'SiCepat' ? 25000 : 35000)).toLocaleString('id-ID')}
              </h2>

              <div className="text-left space-y-4">
                <p className="font-bold text-sm text-[#0f1b29]">Pilih Metode Pembayaran:</p>
                <select value={checkoutData.paymentMethod} onChange={(e) => setCheckoutData({ ...checkoutData, paymentMethod: e.target.value })} className="w-full px-6 py-4 rounded-2xl bg-white border border-[#ece7de] outline-none focus:ring-2 focus:ring-blue-200 transition font-bold text-[#0f1b29]">
                  <option value="BCA Virtual Account">BCA Virtual Account</option>
                  <option value="Mandiri Virtual Account">Mandiri Virtual Account</option>
                  <option value="GoPay">GoPay</option>
                  <option value="QRIS">QRIS</option>
                </select>
              </div>
            </div>

            <div className="bg-[#0f1b29] text-white p-6 rounded-3xl mb-8 shadow-xl shadow-[#0f1b29]/20">
              <p className="text-blue-200 text-sm mb-2">{checkoutData.paymentMethod}</p>
              <p className="text-2xl font-mono font-bold tracking-widest">{checkoutData.paymentMethod === 'QRIS' || checkoutData.paymentMethod === 'GoPay' ? 'Scan via App' : '8839 0123 4567 8900'}</p>
            </div>

            <button onClick={handlePaymentConfirm} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 mb-4">Saya Sudah Bayar</button>
            <button onClick={() => setPage('checkout')} className="w-full text-[#64748b] font-bold text-sm hover:text-[#0f1b29] transition">Kembali ke Checkout</button>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-[#ece7de] text-center mt-20">
        <p className="text-[#64748b] text-[10px] font-black tracking-[0.2em] uppercase">&copy; 2026 MyOldStuff</p>
      </footer>
    </div >
  );
}