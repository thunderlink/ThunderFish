from rest_framework import permissions

class IsOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.writer.user == request.user

class MembershipAccess(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object to edit it.
    """

    def has_object_permission(self, request, view, obj):
        # every permissions are only allowed to Host and Requester.
        
        return (request.user == obj.profile.user)or(request.user == obj.meeting.host.user)
