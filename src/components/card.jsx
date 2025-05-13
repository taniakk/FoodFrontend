import React from 'react'
import './card.css'

const Card = () =>{
    return(
        <>
        <div className='cardbox'>
        <div class="card-group">
  <div className="card">
    <img src="https://images.unsplash.com/photo-1508170754725-6e9a5cfbcabf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Online Image" />
    
    <div className="card-body">
      <h5 className="card-title">Subcategories</h5>
      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div className="card">
  <img src="https://images.unsplash.com/photo-1508170754725-6e9a5cfbcabf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Online Image" />

    <div className="card-body">
      <h5 className="card-title">Subcategories</h5>
      <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
      <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
  <div className="card">
  <img src="https://images.unsplash.com/photo-1508170754725-6e9a5cfbcabf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Online Image" />

    <div className="card-body">
      <h5 className="card-title">Subcategories</h5>
      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
      <p className="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>
        
        </>
    )
}
export default Card