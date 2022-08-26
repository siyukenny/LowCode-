<template>
    <section class="video-container">
        <section v-if="!property.videoUrl.length" class="noVideoSelf"></section>
        <video v-else class="videoSelf" ref="videoSelf" :autoplay="autoplayTag" loop muted :src="videoUrl"></video>
    </section>
</template>

<script>
export default {
    name: "Video",
    props: {
        property: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    computed: {
        autoplayTag() {
            return this.property.isAutoPlay ? true : false;
        },
        videoUrl() {
            return this.property.videoUrl;
        },
    },
    watch: {
        autoplayTag: function (newVal) {
                this.$refs.videoSelf.currentTime = 0;
                newVal ? this.$refs.videoSelf.play() : this.$refs.videoSelf.pause();
        },
        videoUrl: function (newVal) {
            newVal.length > 0 ? (this.property.isAutoPlay ? setTimeout(() => {
                this.$refs.videoSelf.play()
            }, 1000): setTimeout(() => {
                this.$refs.videoSelf.pause()
            }, 1000)) : "";
        },
    },
};
</script>

<style lang="less" scoped>
.video-container {
    box-sizing: border-box;
    width: 100%;
    height: 300px;
    padding: 20px;
    background-color: #fff;
    .noVideoSelf {
        width: 100%;
        height: 100%;
        background: url("../assets/noVideo.png");
        background-size: 100% 100%;
    }
    .videoSelf {
        width: 100%;
        height: 100%;
    }
}
</style>
