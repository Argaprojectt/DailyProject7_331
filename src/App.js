import React, { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('login'); 
  const [user, setUser] = useState(null); 
  const [activeCat] = useState('Semua');
  
  const [items, setItems] = useState([
    { id: 1, name: "Fujifilm X-T20", price: "7.500.000", cat: "Elektronik", condition: "Bekas", loc: "Malang", img: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=600", owner: "admin" },
    { id: 2, name: "Mechanical Keyboard", price: "450.000", cat: "Elektronik", condition: "Baru", loc: "Surabaya", img: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=600", owner: "enno" },
    { id: 3, name: "Buku Rekayasa Kebutuhan", price: "85.000", cat: "Pendidikan", condition: "Bekas", loc: "Malang", img: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600", owner: "enno" }
  ]);

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const role = email.includes('admin') ? 'admin' : 'user';
    setUser({ name: email.split('@')[0], role });
    setPage('home');
  };

  const deleteItem = (id) => {
    if (window.confirm("Hapus barang ini?")) {
      setItems(items.filter(i => i.id !== id));
    }
  };

  if (page === 'login') return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-slate-900">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-200 w-full max-w-md text-center border border-slate-100">
        <h1 className="text-3xl font-black tracking-tighter mb-2">MyOldStuff</h1>
        <p className="text-slate-400 text-sm mb-8 font-medium">Platform Jual Beli Barang Bekas</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input name="email" type="email" placeholder="Email" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-slate-200 transition" required />
          <input type="password" placeholder="Password" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-slate-200 transition" required />
          <button className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200">Masuk Sekarang</button>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-slate-900 font-sans">
      {/* NAVBAR */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 px-6 lg:px-20 py-4 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter cursor-pointer" onClick={() => setPage('home')}>MyOldStuff</h1>
        <div className="hidden md:flex gap-8 text-sm font-semibold text-slate-500">
          <button onClick={() => setPage('home')} className={page === 'home' ? 'text-slate-900' : 'hover:text-slate-700'}>Home</button>
          <button onClick={() => setPage('chat')} className={page === 'chat' ? 'text-slate-900' : 'hover:text-slate-700'}>Chat</button>
          {user.role === 'admin' && <button onClick={() => setPage('admin')} className={page === 'admin' ? 'text-slate-900' : 'hover:text-slate-700'}>Admin Panel</button>}
        </div>
        <div className="flex items-center gap-4">
          <button onClick={() => setPage('sell')} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-slate-200 hover:scale-105 transition active:scale-95">+ Jual</button>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-600 border border-slate-200 uppercase">{user.name[0]}</div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 lg:px-20 py-10">
        {page === 'home' && (
          <>
            {/* HERO BENTO */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
              <div className="lg:col-span-2 bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm flex flex-col justify-center">
                <span className="bg-slate-100 text-slate-600 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full w-fit mb-6">Marketplace</span>
                <h2 className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1] mb-6">Barang lama kamu,<br/><span className="text-slate-400 font-medium italic">harta buat yang lain.</span></h2>
                <div className="flex gap-4 mt-4">
                  <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-slate-300 hover:bg-slate-800 transition">Explore</button>
                  <button className="bg-white border border-slate-200 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition">Wishlist</button>
                </div>
              </div>
              <div className="bg-slate-900 p-10 rounded-[3rem] text-white flex flex-col justify-between overflow-hidden relative shadow-xl shadow-slate-300">
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-1">Status Akun</h3>
                  <p className="text-slate-400 text-xs font-medium">Masuk sebagai {user.role}</p>
                </div>
                <div className="space-y-4 relative z-10">
                  <div className="flex justify-between items-center text-sm border-b border-slate-800 pb-3">
                    <span className="text-slate-400">Total Produk</span>
                    <span className="font-bold text-xl">{items.length}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Lokasi Utama</span>
                    <span className="font-bold">Malang</span>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              </div>
            </div>

            {/* GRID PRODUK */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {items.filter(i => activeCat === 'Semua' || i.cat === activeCat).map(item => (
                <div key={item.id} className="group bg-white rounded-[2.5rem] p-4 border border-slate-50 hover:shadow-2xl hover:shadow-slate-200 transition-all duration-500">
                  <div className="relative h-48 rounded-[2rem] overflow-hidden mb-6">
                    <img src={item.img} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" alt="" />
                    <div className="absolute top-3 left-3 bg-white/80 backdrop-blur px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest">{item.condition}</div>
                  </div>
                  <div className="px-2 pb-2">
                    <h5 className="font-bold text-slate-800 mb-1">{item.name}</h5>
                    <p className="text-slate-400 text-[10px] mb-4 uppercase font-bold tracking-tighter">{item.loc} • {item.cat}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-black tracking-tight text-slate-900">Rp {item.price}</span>
                      {user.role === 'admin' ? (
                        <button onClick={() => deleteItem(item.id)} className="bg-red-50 text-red-500 p-2.5 rounded-xl hover:bg-red-500 hover:text-white transition">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      ) : (
                        <button className="bg-slate-50 text-slate-900 p-2.5 rounded-xl group-hover:bg-slate-900 group-hover:text-white transition shadow-sm">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {page === 'chat' && (
          <div className="max-w-xl mx-auto bg-white p-12 rounded-[3rem] border border-slate-100 text-center shadow-sm">
            <h3 className="text-3xl font-black mb-4 tracking-tighter">💬 Chat</h3>
            <p className="text-slate-400 font-medium">Pesan real-time akan muncul di sini.</p>
          </div>
        )}

        {page === 'sell' && (
          <div className="max-w-xl mx-auto bg-white p-12 rounded-[3rem] border border-slate-100 shadow-sm">
            <h3 className="text-3xl font-black mb-8 tracking-tighter">Pasang Iklan</h3>
            <form className="space-y-4">
              <input placeholder="Nama Barang" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 focus:ring-slate-100" />
              <div className="grid grid-cols-2 gap-4">
                 <input placeholder="Harga" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none" />
                 <select className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none font-medium text-slate-500">
                    <option>Elektronik</option><option>Fashion</option><option>Pendidikan</option>
                 </select>
              </div>
              <textarea placeholder="Deskripsi Singkat" className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-none outline-none h-32"></textarea>
              <button type="button" onClick={() => setPage('home')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-800 transition">Posting Barang</button>
              <button type="button" onClick={() => setPage('home')} className="w-full text-slate-400 font-bold text-sm mt-2">Batal</button>
            </form>
          </div>
        )}
      </main>

      <footer className="py-20 border-t border-slate-100 text-center">
        <p className="text-slate-300 text-[10px] font-black tracking-[0.2em] uppercase">&copy; 2026 MyOldStuff</p>
      </footer>
    </div>
  );
}