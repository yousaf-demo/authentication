<template>
    <MainHeader/>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="add-post-wrapper">
                    <h1>Add New Post</h1>
                </div>
            </div>
        </div>
    </div>
    
</template>
<script>
import MainHeader from './MainHeader.vue';

export default {
    name:'AddPost',
    components: {
    MainHeader, // 👈 Ensure ke ye yahan define ho
  },
}
</script>