<?php

include_once "DB.php";
$GLOBALS['db']=new DB($host,$username,$password,$database);

class Main extends DB {

    public function __construct(){
        //$request=$request;
        //var_dump($request);
        //Ajax Client Requests
        $this->Dispatcher();
    }//__construct


    //Dispatch the Ajax Client Requests
    public function Dispatcher(){
        if(isset($GLOBALS['request'])){
            $opcode='opcode';
            $opcode=$GLOBALS['request']->$opcode;
            //var_dump($request);
            switch($opcode){
                case 'addPostRequest':
                    $this->addPost();
                    break;
                case 'registrationRequest':
                    $this->registration();
                    break;

            }
        }
    }

    public function addPost(){
        $entity='Entity';
        $postTitle='postTitle';
        $postTitle=$GLOBALS['request']->$entity->$postTitle;
        $postDescription='postDescription';
        $postDescription=$GLOBALS['request']->$entity->$postDescription;


        $newPost = array('postTitle' => $postTitle,'postDescription' => $postDescription.'-Im new Dex');
        print (json_encode($newPost));
    }

    public function registration(){
        $entity='Entity';
        $username='username';
        $username=$GLOBALS['request']->$entity->$username;
        $password='password';
        $password=$GLOBALS['request']->$entity->$password;
        $email='email';
        $email=$GLOBALS['request']->$entity->$email;
        $fullname='fullname';
        $fullname=$GLOBALS['request']->$entity->$fullname;


        $newUser = array(
            'username' => $username.'-new',
            'password' => $password.'-new',
            'email' => $email.'-new',
            'message' => 'Welcome to our system : '.$fullname.'-new'
        );
        print (json_encode($newUser));
    }
}


$GLOBALS['request']=json_decode(file_get_contents('php://input'));
$jb=new Main();