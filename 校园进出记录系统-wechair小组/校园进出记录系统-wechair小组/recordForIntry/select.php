<?php

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
    $mysql = new mysqli("175.24.82.144","jiecheng","jiecheng1234","wechair",3306);
    //$query = "insert into stu values('{$id}','{$name}',now(),now())";
    $query = "select * from stu order by id";
    $result = $mysql->query($query);
    $array = array();
    $arr_row = array();
    if($mysql->affected_rows >=1){
        while($data = $result->fetch_array()){
            $arr_row = array();
           
             if($data['id'] == ''){
                array_push($arr_row,'无');
            }else{
                array_push($arr_row,$data['id']);
            }
             if($data['name'] == ''){
                array_push($arr_row,'无');
            }else{
                array_push($arr_row,$data['name']);
            }
            if($data['intime'] == ''){
                array_push($arr_row,'无');
            }else{
                array_push($arr_row,$data['intime']);
            }
            if($data['outtime'] == ''){
                array_push($arr_row,'无');
            }else{
                array_push($arr_row,$data['outtime']);
            }
            array_push($array,$arr_row);
        }
        print_r($array);
    }else{
        echo '0';
    }
