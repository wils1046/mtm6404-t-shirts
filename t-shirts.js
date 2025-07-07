const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: './images/blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: './images/bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: './images/cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: './images/green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: './images/blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: './images/light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: './images/purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: './images/red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: './images/teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
];

 const getInitialTshirts = () => {
    const savedTshirts = localStorage.getItem('tshirts');
    return savedTshirts ? JSON.parse(savedTshirts) : tshirts;
  };

  const [tshirtsState, setTshirts] = React.useState(getInitialTshirts());
  const [selectedQuantities, setSelectedQuantities] = React.useState({});

  React.useEffect(() => {
    localStorage.setItem('tshirts', JSON.stringify(tshirtsState));
  }, [tshirtsState]);

  const handleQuantityChange = (index, quantity) => {
    setSelectedQuantities({
      ...selectedQuantities,
      [index]: parseInt(quantity)
    });
  };

  const handleBuyClick = (index) => {
    const quantity = selectedQuantities[index] || 1;
    
    setTshirts(tshirtsState.map((tshirt, i) => {
      if (i === index) {
        return {
          ...tshirt,
          stock: tshirt.stock - quantity
        };
      }
      return tshirt;
    }));

    setSelectedQuantities({
      ...selectedQuantities,
      [index]: 1
    });
  };

  const createQuantityOptions = (stock) => {
    const options = [];
    for (let i = 1; i <= stock; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  return (
    <div className="container">
      <h1>T-Shirts</h1>
      <div id="tshirt-container">
        {tshirtsState.map((tshirt, index) => (
          <div key={index} className="tshirt-item">
            <img 
              src={tshirt.image} 
              alt={tshirt.title}
              onError={(e) => {
                console.log(`Failed to load image: ${tshirt.image}`);
                e.target.style.backgroundColor = '#e5e5e5';
                e.target.style.display = 'block';
              }}
            />
            
            <h2>{tshirt.title}</h2>
            
            <p className="price">$ {tshirt.price.toFixed(2)}</p>
            
            <div className={`stock ${tshirt.stock === 0 ? 'out-of-stock' : ''}`}>
              {tshirt.stock === 0 ? (
                <span>Out of stock</span>
              ) : (
                <span>{tshirt.stock} left!</span>
              )}
            </div>
            
            {tshirt.stock > 0 && (
              <div className="purchase-controls">
                <select
                  value={selectedQuantities[index] || 1}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                >
                  {createQuantityOptions(tshirt.stock)}
                </select>
                
                <button onClick={() => handleBuyClick(index)}>
                  Buy
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

root.render(<App />);