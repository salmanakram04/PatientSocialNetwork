<template>
<div class="container">
  <form action="/action_page.php">
    <div class="form-group">
      <label for="email">Treatment Title:</label>
      <input type="email" class="form-control" v-model="title">
    </div>

    <div>
        <p>Treatments (Seperate by commas)</p>
        <div class="form-group">
        <textarea cols="30" rows="10" class="w-100" v-model="symptoms"></textarea>
        </div>
    </div>
    <button type="button" @click="upload()" class="btn btn-primary">Add</button>
  </form>
</div>
</template>

<script>
export default {
    data() {
        return {
            title: null,
            symptoms: null
        }
    },
    methods: {
        upload() {
            if(this.title && this.symptoms) {
                let obj = {
                    title: this.title,
                    symptoms: this.symptoms
                }
                this.firebase_push_db({ ref: "treatments", obj }, (res) => {
                    this.alertmsg("Treatment Added Succsessfully", "success")
                    console.log(res, 'my response.')
                })
            }
            else {
                this.alertmsg("Fill the field", "danger")
            }
        }
    }
}
</script>

<style>

</style>