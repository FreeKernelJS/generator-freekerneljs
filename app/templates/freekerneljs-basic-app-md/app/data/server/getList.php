<?php

$list = array();

array_push($list, array('id' => 1, 'name' => 'Item Name 1', 'description' => 'Item Description 1'));
array_push($list, array('id' => 2, 'name' => 'Item Name 2', 'description' => 'Item Description 2'));

echo json_encode($list);
?>