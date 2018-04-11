<?php
   if(isset($_FILES['image'])){
      $errors= array();
      $file_name = $_FILES['image']['name'];
      $file_size =$_FILES['image']['size'];
      $file_tmp =$_FILES['image']['tmp_name'];
      $file_type=$_FILES['image']['type'];
      $file_ext=strtolower(end(explode('.',$_FILES['image']['name'])));
      
      $expensions= array("jpeg","jpg","png");
      
      if(in_array($file_ext,$expensions)=== false){
         $errors[]="extension not allowed, please choose a JPEG or PNG file.";
      }
      
      if($file_size > 2097152){
         $errors[]='File size must be excately 2 MB';
      }
      
      if(empty($errors)==true){
         move_uploaded_file($file_tmp,"images/".$file_name);
         echo "Success";
      }else{
         print_r($errors);
      }
   }
?>


<section class="container">

	<div class="panel panel-default" style="margin-top:80px;">
		<div class="panel-heading">
			<h3 class="panel-title">{{vm.pageTitle}}</h3>
		</div>
		<div class="panel-body">
            <form action = "" name="vm.firForm" method = "POST" enctype = "multipart/form-data">
            
				<div class="row">
					<div class="col-lg-3 form-group">
						<label class="control-label">First Name</label>
						<input type="text" class="form-control" ng-model="vm.firForm.firstname">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Last Name</label>
						<input type="text" class="form-control" ng-model="vm.firForm.lastname">
					</div>
					<div class="col-lg-3 form-group">
						<p class="control-label bold">Gender</p>
						<label>
							<input type="radio" value="1" name="gender" ng-model="vm.firForm.gender">&nbsp; Male
						</label>&nbsp;&nbsp;
						<label>
							<input type="radio" value="2" name="gender" ng-model="vm.firForm.gender">&nbsp; Female
						</label>
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Age</label>
						<input type="text" class="form-control" ng-model="vm.firForm.age">
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 form-group">
						<label class="control-label">Height</label>
						<input type="text" class="form-control" ng-model="vm.firForm.height">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">MIssing Date</label>
						<input type="text" class="form-control" ng-model="vm.firForm.missingdate">
					</div>
					<div class="col-lg-3 form-group">
						<p class="control-label bold">Mentally Ill</p>
						<label>
							<input type="radio" value="1" checked="checked" name="mentallyIll" ng-model="vm.firForm.mentallyIll">&nbsp; Yes
						</label>&nbsp;&nbsp;
						<label>
							<input type="radio" value="2" name="mentallyIll" ng-model="vm.firForm.mentallyIll">&nbsp; No
						</label>
					</div>
					<div class="col-lg-3 form-group">
						<p class="control-label bold">Differently Abled</p>
						<label>
							<input type="radio" value="1" name="dif_abled" ng-model="vm.firForm.dif_abled">&nbsp; Yes
						</label>&nbsp;&nbsp;
						<label>
							<input type="radio" value="2" name="dif_abled" ng-model="vm.firForm.dif_abled">&nbsp; No
						</label>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 form-group">
						<label class="control-label">Hair Color</label>
						<input type="text" class="form-control" ng-model="vm.firForm.hairColor">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Eye Color</label>
						<input type="text" class="form-control" ng-model="vm.firForm.eye_color">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Complexion</label>
						<input type="text" class="form-control" ng-model="vm.firForm.complexion">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Build</label>
						<input type="text" class="form-control" ng-model="vm.firForm.build">
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 form-group">
						<p class="control-label bold">Spectacles</p>
						<label>
							<input type="radio" value="1" name="spectacles" ng-model="vm.firForm.spectacles">&nbsp; Yes
						</label>&nbsp;&nbsp;
						<label>
							<input type="radio" value="2" name="spectacles" ng-model="vm.firForm.spectacles">&nbsp; No
						</label>
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Top Wear</label>
						<input type="text" class="form-control" ng-model="vm.firForm.top_wear">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Bottom Wear</label>
						<input type="text" class="form-control" ng-model="vm.firForm.bottom_wear">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Foot Wear</label>
						<input type="text" class="form-control" ng-model="vm.firForm.foot_wear">
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 form-group">
						<label class="control-label">Address</label>
						<textarea class="form-control" ng-model="vm.firForm.address"></textarea>
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">State</label>
						<input type="text" class="form-control" ng-model="vm.firForm.state">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Pin</label>
						<input type="text" class="form-control" ng-model="vm.firForm.pin">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Fir State</label>
						<input type="text" class="form-control" ng-model="vm.firForm.fir_state">
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 form-group">
						<label class="control-label">Fir Date</label>
						<input type="text" class="form-control" ng-model="vm.firForm.entry_date">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Photo</label>
						<input type="file" name="image" class="form-control" ng-model="vm.firForm.photo">
					</div>
					<div class="col-lg-3 form-group">
						<label class="control-label">Descriptiion</label>
						<textarea class="form-control" ng-model="vm.firForm.description"></textarea>
					</div>
				</div>
				<div class="row">
					<div class="col-lg-3 col-lg-offset-6">
						<a ui-sref="home" class="btn btn-default btn-block btn-lg">Cancel</a>
					</div>
					<div class="col-lg-3">
						<button class="btn btn-primary btn-block btn-lg" type="submit">Submit</button>
					</div>
				</div>
			</form>
		</div>
	</div>

</section>
