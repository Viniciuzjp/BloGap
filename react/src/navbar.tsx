
export default function Navbar() {
    return (
        <div className="nav" style={{height: '60px', width: '100%', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingLeft: '10px', paddingRight: '10px'}}> 
            <h2>BloGap</h2>
            <input
            className="inputSearch"
            type="text"
            placeholder="Search..."
            name="search"
            defaultValue={''}
             />
        </div>
    )
}