<?php

//插入数据
    $id = (int)$_POST['id'];
    $name =$_POST['name'];
    $intime = $_POST['intime'];
    $outtime = $_POST['outtime'];
    $mysql = new mysqli("175.24.82.144","jiecheng","jiecheng1234","wechair",3306);
    //$query = "insert into stu values('{$id}','{$name}',now(),now())";
    $query = "select * from stu where id = $id";
    $result = $mysql->query($query);
    if($mysql->affected_rows == 1){
        if($intime == ""){
            $query = "update stu set outtime = '{$outtime}' where id = $id";
            $mysql->query($query);
        }else{
            $query = "update stu set intime = '{$intime}' where id = $id";
            $mysql->query($query);
            $query = "update stu set outtime = '' where id = $id";
            $mysql->query($query);
        }
    }else{
        $query="insert into stu values('{$id}','{$name}','{$intime}','{$outtime}')";
        $mysql->query($query);
    }
    $result->free();
    $query = "select * from stu where id=$id";
    $result = $mysql->query($query);
    $arr = array();
    $arr1 = $result->fetch_array();
    array_push($arr,$arr1['id']);
    array_push($arr,$arr1['name']);
    array_push($arr,$arr1['intime']);
    if($arr1['outtime'] == ''){
        array_push($arr,'无');
        
    }else{
        array_push($arr,$arr1['outtime']);
    }
    print_r($arr);


  
