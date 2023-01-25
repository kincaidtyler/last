function CreateAccount() {
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <Card
      txtcolor="black"
      header="Create an Account"
      status={status}
      body={show ? 
        <CreateForm setShow={setShow}/> : 
        <CreateMsg setShow={setShow}/>}
    />
  )
}

function CreateMsg(props) {
  return(<>
    <h5>Congrats! Thank you for joining Capstone Bank.</h5>
    <h3>Enjoy, return soon as there are more features to come!</h3>
  </>);
}

function CreateForm(props) {

  const ctx = React.useContext(UserContext);  

  const [name, setName]         = React.useState('');
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleSignUp() {
    // GET HTML Elements
    const emailInput    = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');

    // firebase
    firebase.auth().createUserWithEmailAndPassword(
      emailInput.value,
      passwordInput.value
    )
    .then((user) => { 
      var user = firebase.auth().currentUser;
      ctx.user.email = user.email;
      var uid = user.uid; 
      // mongodbS
      const url = `/users/create/${name}/${email}/${uid}`;
      (async () => {
          var res  = await fetch(url);
          var data = await res.json();    
          console.log(data);        
      })();
      props.setShow(false);
    }, function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Error: ' + errorCode + ' ' + errorMessage);   
    });
  
  }
  
  return (<>
    Name<br/>
    <input type="input" 
      className="form-control" 
      id="nameInput"
      placeholder="Enter name" 
      value={name} 
      onChange={e => setName(e.currentTarget.value)} /><br/>

    Email address<br/>
    <input type="input" 
      className="form-control" 
      id="emailInput"
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      id="passwordInput"
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-primary" 
      onClick={handleSignUp}>Create Account</button>
  </>);
}