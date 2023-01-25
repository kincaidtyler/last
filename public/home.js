function Home() {
  return (
    <>
      <Card
        txtcolor="black"
        header="Welcome to Capstone Bank"
        title="We enjoy protecting your well-being."
        text="We have a multitude of features. With many more coming soon!"
        body={(
          <>
            <p className="text-center"><img src="./capstone_logo.png" className="img-fluid" alt="Bank logo"/></p>
            <p><a href="https://pixabay.com/photos/puzzle-money-business-finance-2500328/" target="_blank" rel="noreferrer"></a></p>
          </>
          )}
      /> 
    </> 
  );  
}